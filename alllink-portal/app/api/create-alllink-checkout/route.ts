import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, successUrl, cancelUrl } = body as {
    email?: string;
    successUrl: string;
    cancelUrl: string;
  };

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: process.env.STRIPE_ALLLINK_PRICE_ID,
        quantity: 1,
      },
    ],
    customer_email: email,
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
    metadata: {
      product: 'alllink',
    },
  });

  return NextResponse.json({ url: session.url });
}
