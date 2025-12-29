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

      <div className="relative max-w-[1320px] mx-auto px-[60px] py-[120px]">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-10 mb-10">
          <h2 className="flex-1 font-bold text-[40px] leading-[44px]">
            Most popular flavours
          </h2>
          <Link
            href="/products"
            className="bg-white border-2 border-[#333] rounded-[100px] px-[60px] py-4 hover:bg-[#f5f5f5] transition-colors"
          >
            <span className="font-bold text-[18px] leading-[28px]">
              VIEW ALL
            </span>
          </Link>
        </div>

        {/* Product Cards */}
        <ProductGrid limit={3} />
      </div>
    </section>
  );
}
