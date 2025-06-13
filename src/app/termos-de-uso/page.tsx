import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Termos de Uso - Laudok',
  description: 'Termos de Uso do Laudok - Condições e regras de utilização da plataforma.',
};

export default function TermsOfUse() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-laudok-dark mb-8">
          Termos de Uso
        </h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-laudok-dark mb-4">
              1. Aceitação dos Termos
            </h2>
            <p className="text-gray-600">
              Ao acessar e utilizar a plataforma Laudok, você concorda em cumprir estes Termos de Uso e todas as leis e 
              regulamentos aplicáveis. Se você não concordar com qualquer parte destes termos, não poderá acessar a plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-laudok-dark mb-4">
              2. Uso da Plataforma
            </h2>
            <p className="text-gray-600">
              A plataforma Laudok é destinada a:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-4">
              <li>Profissionais de engenharia e arquitetura</li>
              <li>Empresas do setor de construção civil</li>
              <li>Administradores de condomínios</li>
              <li>Usuários autorizados pela Laudok</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-laudok-dark mb-4">
              3. Responsabilidades do Usuário
            </h2>
            <p className="text-gray-600">
              Ao utilizar nossa plataforma, você concorda em:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-4">
              <li>Fornecer informações precisas e atualizadas</li>
              <li>Manter a confidencialidade de sua conta</li>
              <li>Utilizar a plataforma de acordo com as leis aplicáveis</li>
              <li>Não realizar atividades que possam prejudicar o funcionamento da plataforma</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-laudok-dark mb-4">
              4. Propriedade Intelectual
            </h2>
            <p className="text-gray-600">
              Todo o conteúdo, funcionalidades e design da plataforma Laudok são protegidos por direitos autorais, 
              marcas registradas e outras leis de propriedade intelectual. O uso não autorizado pode resultar em 
              ações legais.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-laudok-dark mb-4">
              5. Limitação de Responsabilidade
            </h2>
            <p className="text-gray-600">
              A Laudok não se responsabiliza por:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-4">
              <li>Danos causados por uso inadequado da plataforma</li>
              <li>Interrupções temporárias do serviço</li>
              <li>Conteúdo gerado por terceiros</li>
              <li>Decisões tomadas com base nas informações fornecidas pela plataforma</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-laudok-dark mb-4">
              6. Modificações dos Termos
            </h2>
            <p className="text-gray-600">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor 
              imediatamente após sua publicação na plataforma. O uso continuado da plataforma após as alterações 
              constitui aceitação dos novos termos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-laudok-dark mb-4">
              7. Contato
            </h2>
            <p className="text-gray-600">
              Para questões relacionadas a estes Termos de Uso, entre em contato conosco através do email: 
              <a href="mailto:termos@laudok.com.br" className="text-laudok hover:text-laudok-dark">
                {' '}termos@laudok.com.br
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
} 