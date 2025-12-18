'use client';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen">

      {/* Hero Image - Crescent shape at top */}
      <div className="absolute top-0 left-0 w-full h-[70vh] z-10">
        <img
          src="/images/hero.svg"
          alt="Swaadly Hero"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* Decorative Background - Takes bottom half of screen */}
      <div className="absolute left-0 bottom-0 w-full h-[50vh] bg-background z-0">
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[1130px] px-4 z-20">
          <p className="font-medium text-center text-[32px] leading-9">
            Not only gym freaks,
          </p>
          <p className="font-bold text-center text-[40px] leading-11">
            every individual should have healthy diet
          </p>
        </div>
      </div>

    </section>
  );
}
