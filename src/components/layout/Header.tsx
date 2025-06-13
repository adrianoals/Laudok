'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.svg"
                alt="LAUDOK!-PRÓ Logo"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
          {/* CTA Buttons + Hamburguer */}
          <div className="relative flex items-center space-x-4">
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm font-medium text-laudok-dark hover:text-laudok transition-colors"
            >
              Login
            </Link>
            <Link
              href="/teste-gratis"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-laudok-dark hover:bg-laudok hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-sm"
            >
              Experimente Grátis
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-laudok-dark hover:text-laudok hover:bg-laudok-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-laudok transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Abrir menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
            {/* Menu */}
            {isMenuOpen && (
              <div className="absolute top-12 right-0 w-64 sm:w-80 bg-white shadow-lg rounded-lg z-50">
                <div className="px-4 sm:px-6">
                  <div className="py-4 space-y-1">
                    {/* Login apenas no mobile */}
                    <div className="sm:hidden">
                      <Link
                        href="/login"
                        className="block px-3 py-2 rounded-md text-base font-medium text-laudok-dark hover:text-laudok hover:bg-laudok-light transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <div className="border-t border-gray-200 my-2"></div>
                    </div>
                    <Link
                      href="/"
                      className="block px-3 py-2 rounded-md text-base font-medium text-laudok-dark hover:text-laudok hover:bg-laudok-light transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Início
                    </Link>
                    <Link
                      href="#about"
                      className="block px-3 py-2 rounded-md text-base font-medium text-laudok-dark hover:text-laudok hover:bg-laudok-light transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sobre
                    </Link>
                    <Link
                      href="#features"
                      className="block px-3 py-2 rounded-md text-base font-medium text-laudok-dark hover:text-laudok hover:bg-laudok-light transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Funcionalidades
                    </Link>
                    <Link
                      href="#how-it-works"
                      className="block px-3 py-2 rounded-md text-base font-medium text-laudok-dark hover:text-laudok hover:bg-laudok-light transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Como Funciona
                    </Link>
                    <Link
                      href="#testimonials"
                      className="block px-3 py-2 rounded-md text-base font-medium text-laudok-dark hover:text-laudok hover:bg-laudok-light transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Depoimentos
                    </Link>
                    <Link
                      href="#faq"
                      className="block px-3 py-2 rounded-md text-base font-medium text-laudok-dark hover:text-laudok hover:bg-laudok-light transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      FAQ
                    </Link>
                    <Link
                      href="/#plans"
                      className="block px-3 py-2 rounded-md text-base font-medium text-laudok-dark hover:text-laudok hover:bg-laudok-light transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Planos e Preços
                    </Link>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                      <Link
                        href="/contato"
                        className="block px-3 py-2 rounded-md text-base font-medium text-laudok hover:bg-laudok-light transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Fale com um Especialista
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 