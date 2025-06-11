"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-laudok text-white">
      <div className="absolute inset-0 bg-laudok-dark/20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Laudos de Engenharia
              <span className="block text-laudok-light">Inteligentes e Eficientes</span>
            </h1>
            <p className="text-xl md:text-2xl text-laudok-light">
              Simplifique a gestão de laudos técnicos para condomínios com nossa plataforma especializada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/teste-gratis"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-laudok-dark bg-white hover:bg-laudok-light shadow-lg transition-colors"
              >
                Experimente Grátis
              </Link>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
              >
                Fale com um Especialista
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[500px]">
            <Image
              src="/hero-image.png"
              alt="Laudok Platform Preview"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
} 