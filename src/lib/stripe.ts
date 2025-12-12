import Stripe from 'stripe';

// Lazy initialization: cria instância apenas quando necessário (runtime)
// Isso evita erro durante build quando variáveis de ambiente não estão disponíveis
let stripeInstance: Stripe | null = null;
let lastSecretKey: string | null = null;

function getStripeInstance(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  
  // Durante build, a variável pode não estar disponível
  // Verificamos se estamos em build time (Next.js define NEXT_PHASE durante build)
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                      process.env.NEXT_PHASE === 'phase-development-build';
  
  // Se a chave mudou ou a instância não existe, recria
  // Isso garante que em runtime usamos a chave real, mesmo se foi criada dummy durante build
  if (!stripeInstance || (secretKey && lastSecretKey !== secretKey)) {
    if (!secretKey) {
      // Durante build, não falha - apenas cria uma instância dummy
      // A validação real acontece quando a API é chamada em runtime
      if (isBuildTime) {
        // Durante build, usa uma chave dummy que será substituída em runtime
        // Isso permite que o build complete sem erro
        stripeInstance = new Stripe('sk_dummy_for_build_time_only', {
          apiVersion: '2025-11-17.clover',
        });
        lastSecretKey = null;
      } else {
        // Em runtime, valida e falha se não estiver configurado
        throw new Error('STRIPE_SECRET_KEY is not set');
      }
    } else {
      // Sempre usa a chave real quando disponível
      stripeInstance = new Stripe(secretKey, {
        apiVersion: '2025-11-17.clover',
      });
      lastSecretKey = secretKey;
    }
  }
  return stripeInstance;
}

// Exporta getter que valida apenas em runtime (não durante build)
// O Proxy garante que a validação só acontece quando uma propriedade é acessada
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const instance = getStripeInstance();
    const value = instance[prop as keyof Stripe];
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  },
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


