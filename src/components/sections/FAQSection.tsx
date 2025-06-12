"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Quanto tempo leva para aprender a usar o LAUDOK!-PRÓ?',
    answer: 'O LAUDOK!-PRÓ foi desenvolvido para ser intuitivo e fácil de usar. A maioria dos usuários consegue começar a usar o sistema em menos de 1 hora, e oferecemos treinamento completo para sua equipe.',
  },
  {
    question: 'O sistema é compatível com a NBR 16.747?',
    answer: 'Sim! O LAUDOK!-PRÓ foi desenvolvido especificamente para atender aos requisitos da NBR 16.747/2020, garantindo que seus laudos estejam sempre em conformidade com a norma.',
  },
  {
    question: 'Posso personalizar os laudos gerados?',
    answer: 'Sim, você tem total liberdade para personalizar os laudos. O sistema oferece templates editáveis e permite adicionar observações, fotos e informações específicas de cada projeto.',
  },
  {
    question: 'Como funciona o suporte técnico?',
    answer: 'Oferecemos suporte técnico especializado por email, chat e telefone. Nossa equipe está disponível em horário comercial para ajudar com qualquer dúvida ou necessidade.',
  },
  {
    question: 'Posso usar o sistema em diferentes dispositivos?',
    answer: 'Sim! O LAUDOK!-PRÓ é uma plataforma web responsiva que funciona em qualquer dispositivo com acesso à internet, incluindo computadores, tablets e smartphones.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-laudok-dark mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tire suas dúvidas sobre o LAUDOK!-PRÓ
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-laudok overflow-hidden border border-laudok-dark hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-laudok-dark">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-laudok transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-laudok-dark">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 