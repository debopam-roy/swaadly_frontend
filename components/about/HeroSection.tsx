'use client';

import Image from 'next/image';

export default function AboutHeroSection() {
  return (
    <section className="relative w-full bg-[#FFE4B4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-10">
            {/* Badge */}
            <div className="inline-block">
              <div className="bg-white border-2 border-[#333] rounded-full px-6 py-2">
                <p className="font-bold text-sm md:text-base tracking-wider uppercase">
                  About Swaadly
                </p>
              </div>
            </div>

            {/* Heading */}
            <div>
              <h1 className="font-shrikhand italic text-4xl md:text-6xl lg:text-7xl leading-tight">
                Three friends.
              </h1>
              <h1 className="font-shrikhand italic text-4xl md:text-6xl lg:text-7xl leading-tight">
                One question.
              </h1>
              <h1 className="font-shrikhand italic text-4xl md:text-6xl lg:text-7xl leading-tight">
                Real swaad.
              </h1>
            </div>

            {/* Subtext */}
            <p className="font-medium text-xl md:text-2xl leading-relaxed max-w-lg">
              We asked why food labels are so confusing. Then we decided to do something about it.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative">

            {/* Image Container */}
            <div className="absolute -left-6 top-0 right-0 -bottom-8 bg-primary_button rounded-[40px] rotate-3" />
              <div className="relative border-[1] border-[#333] rounded-[40px] overflow-hidden shadow-[3px_4px_0px_0px_#333]">
                <Image
                  src="/images/about_hero_image.svg"
                  alt="Three friends enjoying Swaadly"
                  width={628}
                  height={504}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
