import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="w-full">

      <div className="relative block">
        <Image
          src="https://storage.googleapis.com/swaadly-uploads-prod/hero_banner.svg"
          alt="hero banner"
          width={1920}
          height={685}
          className="w-full block "
        />
      </div>
    </section>



  );
}