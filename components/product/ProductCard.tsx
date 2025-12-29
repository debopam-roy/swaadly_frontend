'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types/product.types';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const defaultVariant = product.variants?.find((v) => v.isDefault) || product.variants?.[0];
  const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];
  const rating = product.averageRating;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-[1] border-black rounded-[36px] overflow-hidden shadow-[0px_8px_16px_0px_rgba(0,0,0,0.12)] hover:shadow-xl transition-shadow">
      <Link href={`/products/${product.slug}`}>
        {/* Product Image */}
        <div className="relative w-full aspect-square">
          {primaryImage && (
            <Image
              src={primaryImage.imageUrl}
              alt={primaryImage.altText || product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col grow gap-3 p-6">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-xl md:text-2xl font-medium  line-clamp-2 hover:text-shadow transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Star Rating */}
        <StarRating rating={rating ?? 0} size="sm" showNumber={true} />

        {/* Price */}
        {defaultVariant && (
          <p className="text-2xl md:text-3xl font-medium ">
            ₹{defaultVariant.sellingPrice}
          </p>
        )}

        {/* Delivery Info */}
        <p className="text-base text-[#666666]">
          Delivery in 7 days
        </p>

        <button
          onClick={handleAddToCart}
          className="w-full mt-auto bg-primary_button font-medium text-xl md:text-2xl py-4 md:py-5 rounded-[40px] cursor-pointer"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
