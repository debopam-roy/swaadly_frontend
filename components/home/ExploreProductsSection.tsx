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
    <div className="flex-1 border border-[#333] rounded-[36px] overflow-hidden flex flex-col">
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
        <h3 className="font-medium text-[#333] text-[28px] leading-[32px]">
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

export default function ExploreProductsSection() {
  // Sample products - in production, these would come from API
  const featuredProducts = [
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
        <div className="flex gap-6 mb-[40px]">
          {featuredProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link
            href="/products"
            className="border-2 border-[#333] rounded-[100px] h-[72px] px-6 flex items-center justify-center gap-2 hover:bg-[#f5f5f5] transition-colors"
          >
            <span className="font-medium text-[#333] text-[24px] leading-[28px]">
              VIEW ALL
            </span>
            <Image
              src="/images/chevron-right.svg"
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
