"use client";

import React, { useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const testimonials = [
  {
    name: 'Eng. Carlos Silva',
    role: 'Engenheiro Civil',
    company: 'Construtora XYZ',
    image: '/images/engineer-1.jpg',
    content: 'O LAUDOK!-PRÓ revolucionou nossa forma de trabalhar. Conseguimos reduzir o tempo de elaboração dos laudos em mais de 70% e a qualidade melhorou significativamente.',
    rating: 5,
  },
  {
    name: 'Arq. Ana Santos',
    role: 'Arquiteta',
    company: 'Escritório ABC',
    image: '/images/architect-1.jpg',
    content: 'A conformidade com a NBR 16.747 é automática e isso nos dá muita segurança. O suporte é excelente e sempre nos ajuda quando precisamos.',
    rating: 5,
  },
  {
    name: 'Eng. Roberto Lima',
    role: 'Engenheiro de Perícias',
    company: 'Consultoria Técnica',
    image: '/images/engineer-2.jpg',
    content: 'A automação dos relatórios fotográficos é impressionante. O que antes levava dias, agora fazemos em horas. Recomendo fortemente!',
    rating: 5,
  },
  {
    name: 'Profa. Dra. Maria Oliveira',
    role: 'Engenheira Civil e Professora',
    company: 'Universidade Federal',
    image: '/images/engineer-3.jpg',
    content: 'Como professora, posso dizer que o LAUDOK!-PRÓ é uma ferramenta essencial para nossos alunos. A interface intuitiva e a conformidade com as normas técnicas tornam o aprendizado muito mais prático e eficiente.',
    rating: 5,
  },
  {
    name: 'Arq. Pedro Mendes',
    role: 'Arquiteto',
    company: 'Studio de Arquitetura',
    image: '/images/architect-2.jpg',
    content: 'A precisão e rapidez na geração de laudos técnicos com o LAUDOK!-PRÓ nos permite focar mais no design e menos na burocracia. Uma ferramenta indispensável para arquitetos modernos.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    slidesToScroll: 1,
  });

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    
    const autoplayInterval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000); // 5 segundos

    return () => clearInterval(autoplayInterval);
  }, [emblaApi]);

  useEffect(() => {
    const cleanup = autoplay();
    return cleanup;
  }, [autoplay]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="testimonials" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-laudok-dark mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Profissionais que já transformaram sua produtividade com o LAUDOK!-PRÓ
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex transition-transform duration-400 ease-in-out">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 px-4"
                >
                  <div className="bg-gradient-laudok rounded-2xl p-8 shadow-laudok hover:shadow-laudok-dark transition-all duration-300 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-laudok-light">
                          {testimonial.role} - {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-500 text-white"
                        />
                      ))}
                    </div>
                    <p className="text-laudok-light italic">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10 -ml-4"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="w-6 h-6 text-laudok-dark" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10 -mr-4"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="w-6 h-6 text-laudok-dark" />
          </button>
        </div>
      </div>
    </section>
  );
}
