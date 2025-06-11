'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-laudok text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo-white.svg"
                alt="LAUDOK!-PRÓ Logo"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-laudok-light mb-6">
              Transformando a forma como laudos técnicos são elaborados. 
              Soluções inteligentes para engenheiros e arquitetos.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-laudok-light transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-laudok-light transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-laudok-light hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/funcionalidades" className="text-laudok-light hover:text-white transition-colors">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="text-laudok-light hover:text-white transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-laudok-light hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-laudok-light">
                contato@laudok.com.br
              </li>
              <li className="text-laudok-light">
                (11) 99999-9999
              </li>
              <li className="text-laudok-light">
                São Paulo, SP
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-laudok-light">
          <p>© {new Date().getFullYear()} LAUDOK!-PRÓ. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
} 