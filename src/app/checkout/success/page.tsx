'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Verificar se há session_id
    if (!sessionId) {
      router.push('/');
      return;
    }

    // Simular verificação (você pode adicionar uma chamada à API para verificar o status)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [sessionId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-laudok" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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




