import Image from 'next/image';

export default function LaudoFacilSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Integrações</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Integra com suas ferramentas favoritas
          </p>
        </div> */}
        <div className="mt-12">
          <div className="relative mx-auto w-full max-w-4xl bg-laudok-light p-4 rounded-lg">
            <Image
              src="/integrations.png"
              alt="Integrações do Sistema"
              width={1200}
              height={800}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 