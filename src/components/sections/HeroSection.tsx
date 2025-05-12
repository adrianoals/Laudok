import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center min-h-[32rem] pt-15 lg:pt-0">
        {/* Texto à esquerda */}
        <div className="w-full lg:w-1/2 z-10 py-12 lg:py-0 flex flex-col items-center lg:items-start">
          <div className="text-center lg:text-left w-full">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Laudos de Engenharia</span>
              <span className="block text-blue-600">Inteligentes para Condomínios</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Simplifique a gestão de laudos técnicos do seu condomínio com nossa plataforma especializada. 
              Agilidade, precisão e conformidade em um só lugar.
            </p>
            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row justify-center lg:justify-start items-center w-full gap-3">
              <div className="rounded-md shadow w-full sm:w-auto">
                <Link
                  href="/signup"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
                >
                  Teste Grátis
                </Link>
              </div>
              <div className="w-full sm:w-auto">
                <Link
                  href="#features"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-colors"
                >
                  Saiba Mais
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Imagem à direita */}
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-blue-50 lg:pt-12">
          <Image
            src="/engenheirofig.png"
            alt="Engenheiro trabalhando"
            width={500}
            height={400}
            className="w-full max-w-md h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
} 