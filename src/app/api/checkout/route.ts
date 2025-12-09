import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_PLANS } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId, email, userName } = body;

    if (!planId || !email || !userName) {
      return NextResponse.json(
        { error: 'Missing required fields: planId, email, userName' },
        { status: 400 }
      );
    }

    // Validar plano
    const plan = STRIPE_PLANS[planId as keyof typeof STRIPE_PLANS];
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Para Enterprise, redirecionar para contato
    if (planId === 'enterprise') {
      return NextResponse.json(
        { error: 'Enterprise plan requires contact', redirectTo: '/contato' },
        { status: 400 }
      );
    }

    // Criar sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/cancel`,
      customer_email: email,
      metadata: {
        userName,
        planId,
        planName: plan.name,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}


