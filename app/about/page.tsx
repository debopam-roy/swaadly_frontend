import { Metadata } from 'next';
import AboutHeroSection from '@/components/about/HeroSection';
import QuoteSection from '@/components/about/QuoteSection';
import OurAnswerSection from '@/components/about/OurAnswerSection';
import TeamSection from '@/components/about/TeamSection';
import VisionSection from '@/components/about/VisionSection';
import WhatWeStandForSection from '@/components/about/WhatWeStandForSection';
import CTASection from '@/components/about/CTASection';

export const metadata: Metadata = {
  title: 'About Us - Swaadly',
  description: 'Learn about Swaadly - India\'s first peanut butter brand serving health with taste. Discover our story, our team, and what we stand for.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0]">
      <AboutHeroSection />
      <QuoteSection />
      <OurAnswerSection />
      <TeamSection />
      <VisionSection />
      <WhatWeStandForSection />
      <CTASection />
    </main>
  );
}
