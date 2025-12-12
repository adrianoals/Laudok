import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
// import { createPelipUser } from '@/lib/pelip-api'; // Desabilitado temporariamente
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
        
        console.log('=== CHECKOUT.SESSION.COMPLETED ===');
        console.log('Session ID:', session.id);
        console.log('Session Mode:', session.mode);
        console.log('Customer Email:', session.customer_email);
        console.log('Customer ID:', session.customer);
        console.log('Subscription ID:', session.subscription);
        console.log('Metadata:', JSON.stringify(session.metadata, null, 2));
        
        // Verificar se é uma assinatura
        if (session.mode === 'subscription') {
          const subscriptionId = session.subscription as string;
          const subscription = await stripe.subscriptions.retrieve(subscriptionId) as Stripe.Subscription;

          console.log('--- Subscription Details ---');
          console.log('Subscription ID:', subscription.id);
          console.log('Status:', subscription.status);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const subData = subscription as any; // Type assertion para acessar propriedades do Stripe
          console.log('Current Period Start:', subData.current_period_start ? new Date(subData.current_period_start * 1000).toISOString() : null);
          console.log('Current Period End:', subData.current_period_end ? new Date(subData.current_period_end * 1000).toISOString() : null);
          console.log('Cancel At Period End:', subData.cancel_at_period_end);
          console.log('Metadata:', JSON.stringify(subscription.metadata, null, 2));
          console.log('Items:', JSON.stringify(subData.items?.data || [], null, 2));

          // Buscar customer para obter todos os dados
          const customerId = subscription.customer as string;
          const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
          
          console.log('--- Customer Details ---');
          console.log('Customer ID:', customer.id);
          console.log('Email:', customer.email);
          console.log('Name:', customer.name);
          console.log('Phone:', customer.phone);
          console.log('Description:', customer.description);
          console.log('Address:', JSON.stringify(customer.address, null, 2));
          console.log('Balance:', customer.balance);
          console.log('Currency:', customer.currency);
          console.log('Delinquent:', customer.delinquent);
          console.log('Created:', new Date(customer.created * 1000).toISOString());
          console.log('Metadata:', JSON.stringify(customer.metadata, null, 2));

          // Log de todos os dados disponíveis para análise
          console.log('=== DADOS COMPLETOS PARA ANÁLISE ===');
          console.log(JSON.stringify({
            session: {
              id: session.id,
              mode: session.mode,
              customer_email: session.customer_email,
              customer: session.customer,
              subscription: session.subscription,
              metadata: session.metadata,
            },
            subscription: {
              id: subscription.id,
              status: subscription.status,
              customer: subscription.customer,
              current_period_start: subData.current_period_start ? new Date(subData.current_period_start * 1000).toISOString() : null,
              current_period_end: subData.current_period_end ? new Date(subData.current_period_end * 1000).toISOString() : null,
              cancel_at_period_end: subscription.cancel_at_period_end,
              items: subscription.items.data.map(item => ({
                price_id: item.price.id,
                product_id: item.price.product,
                quantity: item.quantity,
              })),
              metadata: subscription.metadata,
            },
            customer: {
              id: customer.id,
              email: customer.email,
              name: customer.name,
              phone: customer.phone,
              description: customer.description,
              address: customer.address,
              balance: customer.balance,
              currency: customer.currency,
              delinquent: customer.delinquent,
              created: new Date(customer.created * 1000).toISOString(),
              metadata: customer.metadata,
            },
          }, null, 2));
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        console.log('=== INVOICE.PAYMENT_SUCCEEDED ===');
        console.log('Invoice ID:', invoice.id);
        console.log('Amount Paid:', invoice.amount_paid / 100); // Convertendo de centavos
        console.log('Currency:', invoice.currency);
        console.log('Status:', invoice.status);
        console.log('Customer:', invoice.customer);
        
        // Invoice pode ter subscription como string ID ou expandido
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const invoiceData = invoice as any;
        const subscriptionId = invoiceData.subscription
          ? (typeof invoiceData.subscription === 'string' 
              ? invoiceData.subscription 
              : invoiceData.subscription?.id)
          : null;
        
        console.log('Subscription ID from invoice:', subscriptionId);
        console.log('Invoice Metadata:', JSON.stringify(invoice.metadata, null, 2));
        
        // Se invoice não tem subscription, pode ser pagamento único (não é subscription)
        if (!subscriptionId) {
          console.log('⚠️ Invoice não tem subscription - pode ser pagamento único, não assinatura');
          break;
        }
        
        // Buscar subscription
        const subscription = await stripe.subscriptions.retrieve(subscriptionId) as Stripe.Subscription;
        
        console.log('--- Subscription Details ---');
        console.log('Subscription ID:', subscription.id);
        console.log('Status:', subscription.status);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const subData = subscription as any;
        console.log('Current Period Start:', subData.current_period_start ? new Date(subData.current_period_start * 1000).toISOString() : null);
        console.log('Current Period End:', subData.current_period_end ? new Date(subData.current_period_end * 1000).toISOString() : null);
        console.log('Metadata:', JSON.stringify(subscription.metadata, null, 2));

        const customerId = subscription.customer as string;
        const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
        
        console.log('--- Customer Details ---');
        console.log('Customer ID:', customer.id);
        console.log('Email:', customer.email);
        console.log('Name:', customer.name);
        console.log('Phone:', customer.phone);
        console.log('Address:', JSON.stringify(customer.address, null, 2));
        console.log('Metadata:', JSON.stringify(customer.metadata, null, 2));

        // Log de todos os dados disponíveis para análise
        console.log('=== DADOS COMPLETOS PARA ANÁLISE (PAGAMENTO RECORRENTE) ===');
        console.log(JSON.stringify({
          invoice: {
            id: invoice.id,
            amount_paid: invoice.amount_paid,
            currency: invoice.currency,
            status: invoice.status,
            customer: invoice.customer,
            subscription: subscriptionId,
            metadata: invoice.metadata,
          },
          subscription: {
            id: subscription.id,
            status: subscription.status,
            current_period_start: subData.current_period_start ? new Date(subData.current_period_start * 1000).toISOString() : null,
            current_period_end: subData.current_period_end ? new Date(subData.current_period_end * 1000).toISOString() : null,
            metadata: subscription.metadata,
          },
          customer: {
            id: customer.id,
            email: customer.email,
            name: customer.name,
            phone: customer.phone,
            address: customer.address,
            metadata: customer.metadata,
          },
        }, null, 2));
        
        // IMPORTANTE: Este evento confirma que o pagamento recorrente foi bem-sucedido
        // A assinatura deve estar 'active' após este evento
        if (subscription.status === 'active') {
          console.log('✅ Pagamento recorrente confirmado - Assinatura está ATIVA');
        } else {
          console.log(`⚠️ Assinatura não está ativa após pagamento. Status: ${subscription.status}`);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        console.log('=== CUSTOMER.SUBSCRIPTION.UPDATED ===');
        console.log('Subscription ID:', subscription.id);
        console.log('Status:', subscription.status);
        console.log('Previous Attributes:', JSON.stringify(event.data.previous_attributes, null, 2));
        console.log('Metadata:', JSON.stringify(subscription.metadata, null, 2));

        const customerId = subscription.customer as string;
        const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
        
        console.log('--- Customer Details ---');
        console.log('Customer ID:', customer.id);
        console.log('Email:', customer.email);
        console.log('Name:', customer.name);
        console.log('Metadata:', JSON.stringify(customer.metadata, null, 2));

        console.log('=== DADOS COMPLETOS PARA ANÁLISE ===');
        console.log(JSON.stringify({
          subscription: {
            id: subscription.id,
            status: subscription.status,
            previous_attributes: event.data.previous_attributes,
            metadata: subscription.metadata,
          },
          customer: {
            id: customer.id,
            email: customer.email,
            name: customer.name,
            metadata: customer.metadata,
          },
        }, null, 2));
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        console.log('=== CUSTOMER.SUBSCRIPTION.DELETED ===');
        console.log('Subscription ID:', subscription.id);
        console.log('Status:', subscription.status);
        console.log('Canceled At:', subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null);

        const customerId = subscription.customer as string;
        const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
        
        console.log('--- Customer Details ---');
        console.log('Customer ID:', customer.id);
        console.log('Email:', customer.email);
        console.log('Name:', customer.name);

        console.log('=== DADOS COMPLETOS PARA ANÁLISE ===');
        console.log(JSON.stringify({
          subscription: {
            id: subscription.id,
            status: subscription.status,
            canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
          },
          customer: {
            id: customer.id,
            email: customer.email,
            name: customer.name,
          },
        }, null, 2));
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

