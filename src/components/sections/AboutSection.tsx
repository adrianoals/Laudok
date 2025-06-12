"use client";

import React from 'react';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px]">
            <Image
              src="/about-image.jpg"
              alt="Equipe Laudok"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-laudok-dark">
              Sobre a Laudok: Inovação para a Engenharia Diagnóstica
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              A Laudok nasce da expertise em engenharia diagnóstica com o propósito de inovar a rotina de peritos e 
              profissionais da construção civil. Desenvolvemos o LAUDOK!-PRÓ com a visão de simplificar processos 
              complexos, garantindo a conformidade técnica e elevando a produtividade na elaboração de laudos de 
              inspeção predial.
            </p>
            <p className="text-lg text-gray-600">
              Nosso compromisso é com a excelência técnica e a conformidade total com a ABNT NBR 16.747/2020, 
              oferecendo uma solução que transforma a maneira como os profissionais da área realizam suas vistorias 
              e elaboram seus laudos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 