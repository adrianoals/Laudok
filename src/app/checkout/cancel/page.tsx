'use client';

import Link from 'next/link';
import { XCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

/**
 * Página de cancelamento de checkout
 * 
 * NOTA: Esta página não é usada no fluxo padrão do checkout.
 * Quando o usuário clica em "voltar" no Stripe Checkout, ele é redirecionado
 * para a home (#plans) via cancel_url.
 * 
 * Esta página é mantida caso seja necessário tratar cancelamentos reais
 * de pagamento no futuro (ex: via webhook ou outras integrações).
 */
export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
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




