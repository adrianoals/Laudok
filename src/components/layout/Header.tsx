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
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Laudok Logo"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              Sobre
            </Link>
            <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Funcionalidades
            </Link>
            <Link href="#plans" className="text-gray-600 hover:text-gray-900 transition-colors">
              Planos
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/signup"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-laudok-dark hover:bg-laudok-dark transition-colors"
            >
              Teste Grátis
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Funcionalidades
            </Link>
            <Link
              href="#plans"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Planos
            </Link>
            <Link
              href="/signup"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-laudok-dark hover:bg-laudok-dark"
              onClick={() => setIsMenuOpen(false)}
            >
              Teste Grátis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
} 