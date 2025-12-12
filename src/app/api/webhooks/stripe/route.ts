import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createPelipUser } from '@/lib/pelip-api';
import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: 'Missing stripe-signature or webhook secret' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Processar eventos relevantes
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Verificar se é uma assinatura
        if (session.mode === 'subscription') {
          const subscriptionId = session.subscription as string;
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);

          // Verificar se o pagamento está ativo
          if (subscription.status === 'active') {
            // Buscar customer para obter email e nome
            const customerId = subscription.customer as string;
            const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
            
            const email = customer.email || session.customer_email;
            // Usar o nome do customer como userName (ou billing name se disponível)
            const userName = customer.name || customer.metadata?.name || 'Usuario';

            if (email && userName) {
              try {
                // Criar usuário na API PELIP
                const pelipResponse = await createPelipUser(email, userName);
                console.log('User created in PELIP:', pelipResponse);

                // Opcional: Salvar informações no banco de dados ou atualizar metadata
                // await stripe.subscriptions.update(subscriptionId, {
                //   metadata: {
                //     pelipUserId: pelipResponse.UserId,
                //     pelipCallbackUrl: pelipResponse.CallbackUrl,
                //   },
                // });
              } catch (pelipError) {
                console.error('Error creating user in PELIP:', pelipError);
                // Log do erro mas não falha o webhook
              }
            }
          }
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        // Invoice pode ter subscription como string ID ou expandido
        const subscriptionId = (invoice as any).subscription;
        
        if (subscriptionId && typeof subscriptionId === 'string') {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          
          // Se o pagamento foi bem-sucedido e a assinatura está ativa
          if (subscription.status === 'active') {
            const customerId = subscription.customer as string;
            const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
            
            const email = customer.email;
            // Usar o nome do customer como userName
            const userName = customer.name || customer.metadata?.name || 'Usuario';

            if (email && userName && !subscription.metadata?.pelipUserId) {
              try {
                // Criar usuário na API PELIP se ainda não foi criado
                const pelipResponse = await createPelipUser(email, userName);
                console.log('User created in PELIP (invoice payment):', pelipResponse);
              } catch (pelipError) {
                console.error('Error creating user in PELIP:', pelipError);
              }
            }
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

