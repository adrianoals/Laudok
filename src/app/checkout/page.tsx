'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
  });

  const planId = searchParams.get('plan');

  useEffect(() => {
    if (!planId) {
      setError('Plano não especificado');
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [planId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          email: formData.email,
          userName: formData.userName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.redirectTo) {
          router.push(data.redirectTo);
          return;
        }
        throw new Error(data.error || 'Erro ao criar checkout');
      }

      // Redirecionar para o Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL de checkout não retornada');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar checkout');
      setLoading(false);
    }
  };

  const planNames: Record<string, string> = {
    basico: 'Básico',
    profissional: 'Profissional',
    enterprise: 'Enterprise',
  };

  if (loading && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-laudok" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-laudok-dark">
              Finalizar Assinatura
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Plano: <span className="font-semibold">{planNames[planId || ''] || planId}</span>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-laudok focus:border-laudok focus:z-10 sm:text-sm"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                  Nome de Usuário
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-laudok focus:border-laudok focus:z-10 sm:text-sm"
                  placeholder="Seu nome de usuário"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-laudok-dark hover:bg-laudok focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-laudok disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processando...
                  </>
                ) : (
                  'Continuar para Pagamento'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}




