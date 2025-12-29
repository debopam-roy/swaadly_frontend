'use client';

import Image from 'next/image';

export default function BrandQuoteSection() {
  return (
    <section className="relative bg-white/70 overflow-hidden">
      {/* Decorative Wave Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[150px] sm:h-[200px] md:h-[250px] lg:h-[350px] rotate-180 scale-y-[-1]">
          <Image
            src="/images/wave.svg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Quote Content */}
      <div className="relative px-4 sm:px-8 md:px-12 lg:px-[60px] py-12 sm:py-16 md:py-20 lg:py-[120px] flex items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[886px]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-[100px] leading-tight sm:leading-tight md:leading-tight lg:leading-[104px] text-center">
            <span>&ldquo;India&apos;s first peanut butter brand which </span>
            <span className="text-[#28a777]">serves health</span>
            <span> with taste&rdquo;</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
