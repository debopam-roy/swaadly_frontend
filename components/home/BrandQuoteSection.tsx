'use client';

import Image from 'next/image';

export default function BrandQuoteSection() {
  return (
    <section className="relative bg-white/30  overflow-hidden">
      {/* Decorative Wave Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[350px] rotate-180 scale-y-[-1]">
          <Image
            src="/images/wave.svg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Quote Content */}
      <div className="relative px-[60px] py-[120px] flex items-center justify-center min-h-[886px]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-bold text-[#333] text-[100px] leading-[104px] text-center">
            <span>&ldquo;India&apos;s first peanut butter brand which </span>
            <span className="text-[#28a777]">serves health</span>
            <span> with taste&rdquo;</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
