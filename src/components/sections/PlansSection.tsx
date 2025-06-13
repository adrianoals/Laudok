"use client";

import Link from 'next/link';
import { useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

export default function PlansSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    slidesToScroll: 1,
    startIndex: 1, // Começa com o plano Profissional (índice 1)
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
          <h2 className="text-base text-laudok-dark font-bold tracking-wide uppercase">Planos</h2>
          <p className="mt-2 text-3xl font-extrabold text-laudok-dark sm:text-4xl">
            Escolha o plano ideal para seu condomínio
          </p>
          <p className="mt-4 text-xl text-gray-500">
            Soluções flexíveis para atender às necessidades do seu condomínio
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:mt-12 lg:max-w-4xl lg:mx-auto xl:max-w-none">
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
                <div className="absolute -top-3 right-4 z-10">
                  <span className="inline-flex rounded-full bg-laudok-dark px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
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
                  className={`mt-8 block w-full bg-laudok-dark border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-laudok-dark transition-colors`}
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

        {/* Mobile and Tablet View */}
        <div className="lg:hidden mt-12">
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 px-4"
                  >
                    <div
                      className={`rounded-lg shadow-laudok divide-y divide-gray-200 hover:shadow-laudok-dark transition-all duration-300 hover:scale-105 ${
                        plan.highlighted
                          ? 'border-2 border-laudok relative'
                          : 'border border-gray-200'
                      }`}
                    >
                      {plan.highlighted && (
                        <div className="absolute -top-3 right-4 z-10">
                          <span className="inline-flex rounded-full bg-laudok-dark px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
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
                          className={`mt-8 block w-full bg-laudok-dark border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-laudok-dark transition-colors`}
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
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10 -ml-4"
              aria-label="Plano anterior"
            >
              <ChevronLeft className="w-6 h-6 text-laudok-dark" />
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10 -mr-4"
              aria-label="Próximo plano"
            >
              <ChevronRight className="w-6 h-6 text-laudok-dark" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 