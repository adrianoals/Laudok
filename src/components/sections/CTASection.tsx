"use client";

import React from 'react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-gradient-laudok text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transforme sua produtividade hoje mesmo
          </h2>
          <p className="text-xl text-laudok-light mb-8">
            Experimente gratuitamente por 14 dias e descubra como o LAUDOK!-PRÓ pode revolucionar sua forma de trabalhar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/teste-gratis"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white/10 hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Experimente Grátis
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-laudok-dark bg-white hover:bg-laudok-light hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Fale com um Especialista
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 