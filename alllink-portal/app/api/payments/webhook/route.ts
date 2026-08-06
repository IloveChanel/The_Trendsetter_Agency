import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { sendAllLinkWelcomeEmail } from '@/lib/email';
import { signDownloadUrl } from '@/lib/sign-url';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = (await headers()).get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new NextResponse('Invalid webhook signature', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.metadata?.product !== 'alllink') {
      return new NextResponse('OK', { status: 200 });
    }

    const email = session.customer_email || (session.customer as any)?.email;
    if (!email) {
      return new NextResponse('No email', { status: 400 });
    }

    const exp = Date.now() + 24 * 60 * 60 * 1000;
    const token = signDownloadUrl({ email, exp });
    const downloadUrl = \/api/alllink/download?token=\;

    await sendAllLinkWelcomeEmail(email, downloadUrl);
  }

  return new NextResponse('OK', { status: 200 });
}
