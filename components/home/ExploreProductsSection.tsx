'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProductGrid from '@/components/product/ProductGrid';

export default function ExploreProductsSection() {

  return (
    <section className="relative min-h-screen bg-white">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-[300px] pointer-events-none">
        <Image
          src="/images/wave_orange.svg"
          alt=""
          fill
          className="object-cover rotate-180"
        />
      </div>
       <div className="relative max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-[60px] py-12 sm:py-16 lg:py-[100px] z-10">
        {/* Section Title */}
        <div className="flex items-center justify-center gap-2 sm:gap-5 mb-12 sm:mb-16 lg:mb-[100px]">
          <div className="h-[20px] w-[60px] sm:h-[25px] sm:w-[150px] lg:h-[35px] lg:w-[342px] relative shrink-0">
            <Image
              src="/images/star_divider.svg"
              alt=""
              fill
              className="scale-y-[-1] object-contain"
            />
          </div>
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-[40px] leading-tight text-center whitespace-nowrap">
            Explore our products
          </h2>
          <div className="h-[20px] w-[60px] sm:h-[25px] sm:w-[150px] lg:h-[35px] lg:w-[342px] relative shrink-0">
            <Image
              src="/images/star_divider.svg"
              alt=""
              fill
              className="rotate-180 scale-y-[-1] object-contain"
            />
          </div>
        </div>

        {/* Product Cards */}
        <div className="mb-10">
          <ProductGrid limit={3} />
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link
            href="/products"
            className="border-[1] border-black rounded-[100px] h-[72px] px-6 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="font-bold text-[18px] leading-7">
              VIEW ALL
            </span>
            <Image
              src="/images/right_arrow.svg"
              alt=""
              width={40}
              height={40}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

