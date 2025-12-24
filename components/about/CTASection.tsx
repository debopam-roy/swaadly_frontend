'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative w-full bg-[#FFE4B4] py-12 md:py-24">
      <div className=" mx-auto px-4 sm:px-6 lg:px-16">
        <div className="mx-auto space-y-6 md:space-y-8 text-center">
          {/* Heading */}
          <h2 className="font-shrikhand italic text-[#333] text-4xl md:text-5xl ">
            Ready to taste the difference?
          </h2>

          {/* Description */}
          <p className="font-medium text-[#333] text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto">
            Every ingredient is chosen with care. No surprises, no shortcuts — just real food that tastes the way it should.
          </p>
        
          {/* CTA Button */}
          <div className="pt-4">
            <Link
              href="/products"
              className="inline-block bg-[#44C997] hover:bg-[#3AB586] text-[#333] font-bold text-xl md:text-2xl px-8 md:px-10 py-4 md:py-5 rounded-full transition-colors"
            >
              Explore Our Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
