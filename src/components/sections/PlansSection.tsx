import Link from 'next/link';

export default function PlansSection() {
  const plans = [
    {
      name: 'Básico',
      price: 'R$ 299',
      period: '/mês',
      description: 'Ideal para condomínios pequenos',
      features: [
        'Até 50 unidades',
        'Laudos mensais',
        'Suporte por email',
        'Relatórios básicos',
        'Notificações automáticas',
      ],
      cta: 'Começar Agora',
      highlighted: false,
    },
    {
      name: 'Profissional',
      price: 'R$ 599',
      period: '/mês',
      description: 'Perfeito para condomínios médios',
      features: [
        'Até 200 unidades',
        'Laudos mensais e trimestrais',
        'Suporte prioritário',
        'Relatórios avançados',
        'Notificações automáticas',
        'API de integração',
      ],
      cta: 'Teste Grátis',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Sob consulta',
      period: '',
      description: 'Para grandes condomínios e redes',
      features: [
        'Unidades ilimitadas',
        'Laudos personalizados',
        'Suporte 24/7',
        'Relatórios customizados',
        'API de integração',
        'Treinamento da equipe',
      ],
      cta: 'Fale Conosco',
      highlighted: false,
    },
  ];

  return (
    <section id="plans" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-laudok font-semibold tracking-wide uppercase">Planos</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Escolha o plano ideal para seu condomínio
          </p>
          <p className="mt-4 text-xl text-gray-500">
            Soluções flexíveis para atender às necessidades do seu condomínio
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-laudok divide-y divide-gray-200 hover:shadow-laudok-dark transition-all duration-300 hover:scale-105 ${
                plan.highlighted
                  ? 'border-2 border-laudok relative'
                  : 'border border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="inline-flex rounded-full bg-laudok px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    Mais Popular
                  </span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-medium text-laudok-dark">{plan.name}</h3>
                <p className="mt-4 text-sm text-gray-600">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-laudok-dark">{plan.price}</span>
                  <span className="text-base font-medium text-gray-500">{plan.period}</span>
                </p>
                <Link
                  href="/signup"
                  className={`mt-8 block w-full bg-laudok border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-laudok-dark transition-colors`}
                >
                  {plan.cta}
                </Link>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-laudok-dark tracking-wide uppercase">
                  O que está incluído
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-laudok"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 