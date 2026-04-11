Vercel deploy & environment setup for TopPick Resume

1) Required Vercel environment variables

- TOPPICK_BACKEND_URL — set to your Railway public URL (e.g. https://fantastic-enchantment-production.up.railway.app)
- TOPPICK_API_KEY — a strong secret string; the proxy will add this to upstream requests as `X-API-KEY`

Add them in the Vercel Dashboard → Project → Settings → Environment Variables (add for Preview and Production), or via the Vercel CLI:

```bash
vercel login
vercel env add TOPPICK_BACKEND_URL production
vercel env add TOPPICK_API_KEY production
vercel env add TOPPICK_BACKEND_URL preview
vercel env add TOPPICK_API_KEY preview
```

2) What the repository now contains

- `api/proxy/[...path].js` — a Vercel serverless function that forwards requests to the Railway backend and injects `X-API-KEY` from `TOPPICK_API_KEY`.
- Frontend calls `POST /api/proxy/analyze` (no API key visible in the browser).

3) Railway / Backend requirements

- Ensure your Railway service accepts the `X-API-KEY` header and verifies it matches the value set in `TOPPICK_API_KEY`.
- Allow CORS from `https://thetrendsetteragency.com` if the backend is called directly; when using the proxy this is less critical because requests are same-origin to Vercel.

4) Quick smoke test (after adding env vars & redeploy)

- Open the TopPick page and run an analysis via the form. The request will go to `/api/proxy/analyze` and the proxy will forward it to Railway.
- If you see a 500 with message `TOPPICK_BACKEND_URL not configured`, check the Vercel env variables.

5) Rewrites (optional)

You do not need to add a `rewrites` rule to `vercel.json` because the serverless proxy handles forwarding. If you prefer rewrites that map `/api/toppick/*` directly to Railway, be careful: embedding API keys in `vercel.json` is not safe for repo storage.

6) Next steps I can do for you

- Add more robust logging and error mapping in the proxy.
- Add rate-limiting or basic auth on the proxy if you want to limit abuse.
