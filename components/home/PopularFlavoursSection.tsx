'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProductGrid from '@/components/product/ProductGrid';

export default function PopularFlavoursSection() {

  return (
    <section className="relative bg-background overflow-x-clip">
      {/* Top Half - Inverted D SVG Background */}
      <div className="absolute top-0 left-0 w-full h-2/3 pointer-events-none overflow-hidden">
        <Image
          src="/images/inverted_d.svg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* Bottom Half - Regular Background */}
      <div className="absolute bottom-0 left-0 w-full h-1/2" />

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-[60px] py-12 sm:py-16 lg:py-[120px]">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 sm:gap-6 lg:gap-10 mb-8 sm:mb-10 lg:mb-10">
          <h2 className="flex-1 font-bold text-2xl sm:text-3xl lg:text-[40px] leading-tight sm:leading-tight lg:leading-11">
            Most popular flavours
          </h2>
          {/* Desktop View All Button */}
          <Link
            href="/products"
            className="hidden sm:flex border-[1] border-black rounded-[100px] py-3 px-6 sm:py-4 sm:px-8 items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span className="font-bold text-base sm:text-[18px] leading-7">
              VIEW ALL
            </span>
          </Link>
        </div>

        {/* Product Cards */}
        <ProductGrid limit={3} />

        {/* Mobile View All Button */}
        <div className="flex sm:hidden justify-center mt-8">
          <Link
            href="/products"
            className="border-[1] border-black rounded-[100px] py-3 px-6 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span className="font-bold text-base leading-7">
              VIEW ALL
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
