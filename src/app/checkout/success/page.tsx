'use client';

import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="flex justify-center">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-laudok-dark">
              Pagamento Confirmado!
            </h1>
            <p className="text-lg text-gray-600">
              Obrigado por assinar o Laudok. Seu cadastro está sendo processado e você receberá um email com as instruções de acesso em breve.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <Link
              href="/"
              className="block w-full bg-laudok-dark text-white py-3 px-4 rounded-md hover:bg-laudok transition-colors font-medium"
            >
              Voltar para Home
            </Link>
            <p className="text-sm text-gray-500">
              Se você tiver dúvidas, entre em contato conosco em{' '}
              <a href="mailto:contato@laudok.com.br" className="text-laudok hover:underline">
                contato@laudok.com.br
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}




