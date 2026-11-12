import { createHmac, timingSafeEqual } from 'node:crypto';
import { Readable } from 'node:stream';

function settings(env) {
  const key = env.STRIPE_SECRET_KEY;
  const site = env.SHIPDESK_SITE_URL || env.SEWSNAP_SITE_URL;
  const secret = env.SEWSNAP_LICENSE_SECRET || env.SHIPDESK_LICENSE_SECRET;
  const prices = {
    month: env.SEWSNAP_MONTHLY_PRICE_ID || 'price_1Ub2qq8iPFK6atZj1f64oifj',
    year: env.SEWSNAP_ANNUAL_PRICE_ID || 'price_1Ub2qr8iPFK6atZjmZtu7IZj',
  };
  if (!key || !site || !secret || secret.length < 32 || !prices.month || !prices.year) {
    throw Object.assign(new Error('SewSnap billing is not configured'), { status: 503 });
  }
  return { key, site: new URL(site).origin, secret, prices };
}

function agreed(body) {
  const value = body && (body.agree ?? body.terms);
  return value === 'yes' || value === 'on';
}

async function formFields(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return Object.fromEntries(new URLSearchParams(raw)); }
}

function sign(id, secret) {
  return id + '.' + createHmac('sha256', secret).update('sewsnap:' + id).digest('base64url');
}

function decode(token, secret) {
  const [id] = token.split('.');
  if (!/^sub_[a-zA-Z0-9]+$/.test(id)) return null;
  const expected = Buffer.from(sign(id, secret));
  const given = Buffer.from(token);
  return expected.length === given.length && timingSafeEqual(expected, given) ? id : null;
}

export function createHandler({ env = process.env, fetcher = fetch } = {}) {
  return async function handler(req, res) {
    const url = new URL(req.url, 'http://localhost');
    const action = url.searchParams.get('action');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Referrer-Policy', 'no-referrer');
    try {
      const { key, site, secret, prices } = settings(env);
      async function stripe(path, form) {
        const response = await fetcher('https://api.stripe.com/v1/' + path, {
          method: form ? 'POST' : 'GET',
          headers: { Authorization: 'Bearer ' + key, 'Stripe-Version': '2025-03-31.basil' },
          body: form && new URLSearchParams(form),
        });
        if (!response.ok) throw Object.assign(new Error('Stripe could not verify this request'), { status: 502 });
        return response.json();
      }

      if (action === 'checkout' && req.method === 'POST') {
        const fields = await formFields(req);
        if (!agreed(fields)) {
          res.statusCode = 303;
          res.setHeader('Location', site + '/sewsnap/#requirements');
          return res.end();
        }
        const plan = url.searchParams.get('plan') === 'year' ? 'year' : 'month';
        const session = await stripe('checkout/sessions', {
          mode: 'subscription',
          'line_items[0][price]': prices[plan],
          'line_items[0][quantity]': '1',
          'subscription_data[trial_period_days]': '7',
          'metadata[product]': 'sewsnap',
          'metadata[terms]': 'accepted-no-refund-2026-11-12',
          success_url: site + '/sewsnap/?session_id={CHECKOUT_SESSION_ID}',
          cancel_url: site + '/sewsnap/',
        });
        return res.redirect(303, session.url);
      }

      let id;
      if (action === 'claim' && req.method === 'POST') {
        const sessionId = req.body?.session_id;
        if (typeof sessionId !== 'string' || !/^cs_(test|live)_[a-zA-Z0-9]+$/.test(sessionId)) {
          return res.status(400).json({ error: 'Invalid checkout session' });
        }
        const session = await stripe('checkout/sessions/' + sessionId);
        if (session.status !== 'complete' || session.metadata?.product !== 'sewsnap') {
          return res.status(403).json({ error: 'SewSnap payment has not been confirmed' });
        }
        id = session.subscription;
      } else if (['status', 'download'].includes(action) && req.method === 'GET') {
        id = decode((req.headers.authorization || '').replace(/^Bearer /, ''), secret);
      } else {
        return res.status(405).json({ error: 'Unsupported billing request' });
      }

      if (!id || !/^sub_[a-zA-Z0-9]+$/.test(id)) return res.status(401).json({ error: 'Invalid license' });
      const subscription = await stripe('subscriptions/' + id);
      const item = subscription.items?.data?.find(row => row.price?.id === prices.month || row.price?.id === prices.year);
      if (!item) return res.status(403).json({ error: 'Subscription does not contain SewSnap' });
      const active = ['active', 'trialing'].includes(subscription.status) && item.current_period_end * 1000 > Date.now();
      const details = { active, status: subscription.status, purchased_at: subscription.start_date,
        period_end: item.current_period_end, cancel_at_period_end: subscription.cancel_at_period_end,
        amount: item.price.unit_amount, currency: item.price.currency, interval: item.price.recurring?.interval };
      if (action === 'status') return res.status(200).json(details);
      if (!active) return res.status(403).json({ error: 'SewSnap subscription is inactive' });
      if (action === 'claim') return res.status(200).json({ ...details, license: sign(id, secret) });
      if (!env.SEWSNAP_PRIVATE_DOWNLOAD_URL) return res.status(503).json({ error: 'The desktop download is not attached yet' });
      const headers = env.SEWSNAP_DOWNLOAD_TOKEN ? { Authorization: 'Bearer ' + env.SEWSNAP_DOWNLOAD_TOKEN } : {};
      const file = await fetcher(env.SEWSNAP_PRIVATE_DOWNLOAD_URL, { headers });
      if (!file.ok || !file.body) return res.status(502).json({ error: 'Download unavailable' });
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="SewSnap.zip"');
      Readable.fromWeb(file.body).pipe(res);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.status ? error.message : 'Billing request failed' });
    }
  };
}

export default createHandler();
