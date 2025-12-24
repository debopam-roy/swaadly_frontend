import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen relative">

      <div className="relative block" style={{ marginBottom: '-1px' }}>
        <Image 
          src="/images/hero_banner.svg" 
          alt="hero banner" 
          width={1920} 
          height={685} 
          className="w-full block"
          style={{ display: 'block' }}
        />
      </div>

      {/* Orange Wave + Tagline + Orange Wave Section */}
      <div className="relative border border-amber-600" >
        {/* Upper Wave */}
        <div className="relative block">
          <Image 
            src="/images/wave_orange.svg" 
            alt="upper curve" 
            width={1920} 
            height={100} 
            className="w-full block"
            style={{ display: 'block' }}
          />
        </div>

        {/* Tagline */}
        <div className="flex items-center justify-center bg-background">
          <div className="max-w-2xl">
            <Image 
              src="/images/hero_tagline.svg" 
              alt="Swaadly" 
              width={768} 
              height={200} 
              className="w-full"
            />
          </div>
        </div>

        {/* Lower Wave (rotated) */}
        <div className="relative block">
          <Image 
            src="/images/wave_orange.svg" 
            alt="lower curve" 
            width={1920} 
            height={100} 
            className="w-full block rotate-180"
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </section>
  );
}