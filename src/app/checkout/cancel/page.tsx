'use client';

import Link from 'next/link';
import { XCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="flex justify-center">
            <XCircle className="w-20 h-20 text-red-500" />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-laudok-dark">
              Pagamento Cancelado
            </h1>
            <p className="text-lg text-gray-600">
              Seu pagamento foi cancelado. Nenhuma cobrança foi realizada.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <Link
              href="/#plans"
              className="block w-full bg-laudok-dark text-white py-3 px-4 rounded-md hover:bg-laudok transition-colors font-medium"
            >
              Ver Planos Novamente
            </Link>
            <Link
              href="/"
              className="block w-full border border-laudok-dark text-laudok-dark py-3 px-4 rounded-md hover:bg-laudok-light transition-colors font-medium"
            >
              Voltar para Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



