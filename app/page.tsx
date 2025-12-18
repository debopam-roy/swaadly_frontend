import HeroSection from '@/components/home/HeroSection';
import ExploreProductsSection from '@/components/home/ExploreProductsSection';
import FromPeanutSection from '@/components/home/FromPeanutSection';
import BrandQuoteSection from '@/components/home/BrandQuoteSection';
import OurPromiseSection from '@/components/home/OurPromiseSection';
import PopularFlavoursSection from '@/components/home/PopularFlavoursSection';

export default function Home() {
  return (
    <main
      className="min-h-screen relative overflow-x-clip"
      style={{
        backgroundImage: "url('/images/peanut_butter.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <HeroSection />
      <ExploreProductsSection />
      <FromPeanutSection />
      <BrandQuoteSection />
      <OurPromiseSection />
      <PopularFlavoursSection />
    </main>
  );
}
