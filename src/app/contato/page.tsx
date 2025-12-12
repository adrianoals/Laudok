import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contato/ContactForm';
import ContactInfo from '@/components/contato/ContactInfo';
import WhatsAppButton from '@/components/contato/WhatsAppButton';

export const metadata = {
  title: 'Contato - Laudok',
  description: 'Entre em contato com a Laudok. Estamos prontos para ajudar você com laudos de engenharia.',
};

export default function ContatoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-laudok text-white pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Entre em Contato
              </h1>
              <p className="text-xl text-laudok-light max-w-2xl mx-auto">
                Estamos aqui para ajudar você. Tire suas dúvidas ou solicite
                mais informações sobre nossos serviços.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <ContactInfo />
                <div className="mt-8">
                  <WhatsAppButton />
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

