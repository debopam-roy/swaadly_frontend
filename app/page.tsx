import Image from 'next/image';
import HeroSection from '@/components/home/HeroSection';
import ExploreProductsSection from '@/components/home/ExploreProductsSection';
import FromPeanutSection from '@/components/home/FromPeanutSection';
import BrandQuoteSection from '@/components/home/BrandQuoteSection';
import OurPromiseSection from '@/components/home/OurPromiseSection';
import PopularFlavoursSection from '@/components/home/PopularFlavoursSection';
import ReviewsSection from '@/components/reviews/ReviewsSection';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-white">
      {/* Background Image */}
      <div className="fixed inset-0 z-1 hidden md:block">
        <Image
          src="https://storage.googleapis.com/swaadly-uploads-prod/hero_background_desktop.png"
          alt="Background"
          fill
          priority
          className="object-cover object-[center_5%]"
        />
      </div>
      <div className="fixed inset-0 z-2 md:hidden top-10">
        <Image
          src="https://storage.googleapis.com/swaadly-uploads-prod/hero_background_mobile.png"
          alt="Background"
          fill
          priority
          className="object-contain object-top"
        />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <ExploreProductsSection />
        <FromPeanutSection />
        <BrandQuoteSection />
        <OurPromiseSection />
        <PopularFlavoursSection />
        <ReviewsSection />
      </div>
    </main>
  );
}