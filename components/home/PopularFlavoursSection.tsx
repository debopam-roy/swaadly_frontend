'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  name: string;
  price: number;
  rating: number;
  deliveryDays: number;
  image: string;
  slug: string;
}

function ProductCard({ name, price, rating, deliveryDays, image, slug }: ProductCardProps) {
  return (
    <div className="flex-1 border-2 border-[#333] rounded-[36px] overflow-hidden flex flex-col shadow-[0px_8px_16px_0px_rgba(0,0,0,0.12)]">
      {/* Product Image */}
      <div className="relative h-[279px] w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="bg-white p-6 flex flex-col gap-4">
        <h3 className="font-medium text-[#333] text-[24px] leading-[28px]">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                src={i < Math.floor(rating) ? '/images/star-filled.svg' : '/images/star-empty.svg'}
                alt=""
                width={24}
                height={24}
              />
            ))}
          </div>
          <span className="font-medium text-[#333] text-[24px] leading-[28px]">
            {rating}
          </span>
        </div>

        {/* Price */}
        <p className="font-medium text-[#333] text-[24px] leading-[28px]">
          ₹{price}
        </p>

        {/* Delivery Info */}
        <p className="font-light text-[#333] text-[20px] leading-[24px]">
          Delivery in {deliveryDays} days
        </p>

        {/* Buy Button */}
        <Link
          href={`/products/${slug}`}
          className="bg-[#44c997] hover:bg-[#3AB586] transition-colors rounded-[40px] h-[72px] flex items-center justify-center font-medium text-[#333] text-[24px] leading-[28px]"
        >
          Buy now
        </Link>
      </div>
    </div>
  );
}

export default function PopularFlavoursSection() {
  // Sample products - in production, these would come from API
  const popularProducts = [
    {
      name: 'Original Classic (500g)',
      price: 400,
      rating: 4.4,
      deliveryDays: 7,
      image: '/images/product-classic.png',
      slug: 'original-classic-500g',
    },
    {
      name: 'Original Classic (500g)',
      price: 400,
      rating: 4.4,
      deliveryDays: 7,
      image: '/images/product-classic.png',
      slug: 'original-classic-500g',
    },
    {
      name: 'Original Classic (500g)',
      price: 400,
      rating: 4.4,
      deliveryDays: 7,
      image: '/images/product-classic.png',
      slug: 'original-classic-500g',
    },
  ];

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
          <h2 className="flex-1 font-bold text-[#333] text-[40px] leading-[44px]">
            Most popular flavours
          </h2>
          <Link
            href="/products"
            className="bg-white border-2 border-[#333] rounded-[100px] px-[60px] py-4 hover:bg-[#f5f5f5] transition-colors"
          >
            <span className="font-bold text-[#333] text-[18px] leading-[28px]">
              VIEW ALL
            </span>
          </Link>
        </div>

        {/* Product Cards */}
        <div className="flex gap-6">
          {popularProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
