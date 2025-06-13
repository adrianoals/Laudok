import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Política de Privacidade - Laudok',
  description: 'Política de Privacidade do Laudok - Proteção e uso de dados.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-laudok-dark mb-8">
          Política de Privacidade
        </h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-laudok-dark mb-4">
              1. Introdução
            </h2>
            <p className="text-gray-600">
              A Laudok está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, 
              usamos, divulgamos e protegemos suas informações pessoais quando você utiliza nossos serviços.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-laudok-dark mb-4">
              2. Informações que Coletamos
            </h2>
            <p className="text-gray-600">
              Coletamos informações que você nos fornece diretamente, incluindo:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-4">
              <li>Nome e informações de contato</li>
              <li>Informações profissionais</li>
              <li>Dados de uso da plataforma</li>
              <li>Informações de pagamento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-laudok-dark mb-4">
              3. Como Usamos suas Informações
            </h2>
            <p className="text-gray-600">
              Utilizamos suas informações para:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-4">
              <li>Fornecer e melhorar nossos serviços</li>
              <li>Processar pagamentos</li>
              <li>Enviar comunicações importantes</li>
              <li>Personalizar sua experiência</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-laudok-dark mb-4">
              4. Proteção de Dados
            </h2>
            <p className="text-gray-600">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra 
              acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-laudok-dark mb-4">
              5. Seus Direitos
            </h2>
            <p className="text-gray-600">
              Você tem o direito de:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-4">
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir dados imprecisos</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Retirar seu consentimento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-laudok-dark mb-4">
              6. Contato
            </h2>
            <p className="text-gray-600">
              Para questões relacionadas a esta Política de Privacidade, entre em contato conosco através do email: 
              <a href="mailto:privacidade@laudok.com.br" className="text-laudok hover:text-laudok-dark">
                {' '}privacidade@laudok.com.br
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
