"use client";

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Eng. Carlos Silva',
    role: 'Engenheiro Civil',
    company: 'Construtora XYZ',
    image: '/testimonials/engineer-1.jpg',
    content: 'O LAUDOK!-PRÓ revolucionou nossa forma de trabalhar. Conseguimos reduzir o tempo de elaboração dos laudos em mais de 70% e a qualidade melhorou significativamente.',
    rating: 5,
  },
  {
    name: 'Arq. Ana Santos',
    role: 'Arquiteta',
    company: 'Escritório ABC',
    image: '/testimonials/architect-1.jpg',
    content: 'A conformidade com a NBR 16.747 é automática e isso nos dá muita segurança. O suporte é excelente e sempre nos ajuda quando precisamos.',
    rating: 5,
  },
  {
    name: 'Eng. Roberto Lima',
    role: 'Engenheiro de Perícias',
    company: 'Consultoria Técnica',
    image: '/testimonials/engineer-2.jpg',
    content: 'A automação dos relatórios fotográficos é impressionante. O que antes levava dias, agora fazemos em horas. Recomendo fortemente!',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-laudok-dark mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Profissionais que já transformaram sua produtividade com o LAUDOK!-PRÓ
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-laudok-light rounded-2xl p-8 shadow-laudok"
            >
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
                  <h3 className="text-xl font-bold text-laudok-dark">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600">
                    {testimonial.role} - {testimonial.company}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-laudok text-laudok"
                  />
                ))}
              </div>
              <p className="text-gray-600 italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 