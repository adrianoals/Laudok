import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ProblemSolutionSection from '@/components/sections/ProblemSolutionSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';
import FAQSection from '@/components/sections/FAQSection';

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
      <ProblemSolutionSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </main>
  );
}
