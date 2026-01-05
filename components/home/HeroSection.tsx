import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="w-full">
      {/* Desktop Banner */}
      <div className="relative hidden md:block">
        <Image
          src="https://storage.googleapis.com/swaadly-uploads-prod/hero_banner_desktop.png"
          alt="hero banner"
          width={1920}
          height={685}
          className="w-full block"
        />
      </div>
      {/* Mobile Banner */}
      <div className="relative md:hidden">
        <Image
          src="https://storage.googleapis.com/swaadly-uploads-prod/hero_banner_mobile.png"
          alt="hero banner"
          width={1080}
          height={1080}
          className="w-full block"
        />
      </div>
    </section>
  );
}