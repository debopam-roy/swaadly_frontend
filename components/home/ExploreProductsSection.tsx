'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProductGrid from '@/components/product/ProductGrid';

export default function ExploreProductsSection() {

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/wave.svg"
          alt=""
          fill
          className="object-cove"
        />
      </div>

      <div className="relative max-w-[1320px] mx-auto px-[60px] py-[100px]">
        {/* Section Title */}
        <div className="flex items-center justify-center gap-5 mb-[100px]">
          <div className="h-[35px] w-[342px] relative">
            <Image
              src="/images/star_divider.svg"
              alt=""
              fill
              className="scale-y-[-1]"
            />
          </div>
          <h2 className="font-bold text-[#333] text-[40px] leading-[44px] whitespace-nowrap">
            Explore our products
          </h2>
          <div className="h-[35px] w-[342px] relative">
            <Image
              src="/images/star_divider.svg"
              alt=""
              fill
              className="rotate-180 scale-y-[-1]"
            />
          </div>
        </div>

        {/* Product Cards */}
        <div className="mb-[40px]">
          <ProductGrid limit={3} />
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link
            href="/products"
            className="border-2 border-[#333] rounded-[100px] h-[72px] px-6 flex items-center justify-center gap-2 hover:bg-[#f5f5f5] transition-colors"
          >
            <span className="font-medium text-[#333] text-[24px] leading-7">
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
