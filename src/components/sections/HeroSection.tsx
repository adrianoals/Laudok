"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-laudok text-white">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute min-w-full min-h-full object-cover opacity-20"
          poster="/hero-image.png"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-laudok-dark/20" />
      </div>

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
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-laudok-dark bg-white hover:bg-laudok-light hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Experimente Grátis
              </Link>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-laudok-dark hover:bg-laudok hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Fale com um Especialista
              </Link>
            </div>
          </div>
          {/* <div className="relative h-[400px] lg:h-[500px]">
            <Image
              src="/hero-image.png"
              alt="Laudok Platform Preview"
              fill
              className="object-contain"
              priority
            />
          </div> */}
        </div>
      </div>
    </section>
  );
} 