import HeroSection from '@/components/home/HeroSection';
import ExploreProductsSection from '@/components/home/ExploreProductsSection';
import FromPeanutSection from '@/components/home/FromPeanutSection';
import BrandQuoteSection from '@/components/home/BrandQuoteSection';
import OurPromiseSection from '@/components/home/OurPromiseSection';
import PopularFlavoursSection from '@/components/home/PopularFlavoursSection';
import ReviewsSection from '@/components/reviews/ReviewsSection';

export default function Home() {
  return (
    <main
      className="bg-white bg-[url('https://storage.googleapis.com/swaadly-uploads-prod/hero_background.png')] bg-cover bg-fixed bg-no-repeat min-h-screen overflow-x-clip bg-position-[center_0%] sm:bg-position-[center_5%]"
    >
      <div className="">
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