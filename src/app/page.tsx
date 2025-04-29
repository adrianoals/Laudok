import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import PlansSection from '@/components/sections/PlansSection';
import AppPreviewSection from '@/components/sections/AppPreviewSection';

export const metadata = {
  title: 'Laudok - Laudos de Engenharia Inteligentes',
  description: 'Plataforma especializada em laudos de engenharia para condomínios. Simplifique a gestão de laudos técnicos com nossa solução inteligente.',
  openGraph: {
    title: 'Laudok - Laudos de Engenharia Inteligentes',
    description: 'Plataforma especializada em laudos de engenharia para condomínios. Simplifique a gestão de laudos técnicos com nossa solução inteligente.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Laudok - Laudos de Engenharia Inteligentes',
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <PlansSection />
      <AppPreviewSection />
      <Footer />
    </main>
  );
}
