import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/sections/HeroSection';
import AboutSection from '@/components/home/sections/AboutSection';
import FeaturesSection from '@/components/home/sections/FeaturesSection';
import ProblemSolutionSection from '@/components/home/sections/ProblemSolutionSection';
import HowItWorksSection from '@/components/home/sections/HowItWorksSection';
import PlansSection from '@/components/home/sections/PlansSection';
import TestimonialsSection from '@/components/home/sections/TestimonialsSection';
import CTASection from '@/components/home/sections/CTASection';
import FAQSection from '@/components/home/sections/FAQSection';

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
      <ProblemSolutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PlansSection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </main>
  );
}
