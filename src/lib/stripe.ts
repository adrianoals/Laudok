import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-11-17.clover',
});

// Planos disponíveis no Stripe
export const STRIPE_PLANS = {
  basico: {
    priceId: process.env.STRIPE_PRICE_ID_BASICO || 'price_1ScaeDP1IAVAPkrfWK70N4K0',
    name: 'Básico',
    amount: 29900, // R$ 299,00 em centavos
  },
  profissional: {
    priceId: process.env.STRIPE_PRICE_ID_PROFISSIONAL || 'price_1ScaeEP1IAVAPkrf0q3eBJau',
    name: 'Profissional',
    amount: 59900, // R$ 599,00 em centavos
  },
  enterprise: {
    priceId: process.env.STRIPE_PRICE_ID_ENTERPRISE || '',
    name: 'Enterprise',
    amount: 0, // Sob consulta
  },
};


