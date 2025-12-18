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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  return (
    <div className="flex flex-col bg-white border-2 border-[#333333] rounded-[36px] overflow-hidden shadow-[0px_8px_16px_0px_rgba(0,0,0,0.12)] hover:shadow-xl transition-shadow">
      <Link href={`/products/${product.slug}`}>
        {/* Product Image */}
        <div className="relative w-full aspect-square bg-[#F5EDE0]">
          {primaryImage && (
            <Image
              src={primaryImage.imageUrl}
              alt={primaryImage.altText || product.name}
              fill
              className="object-cover"
            />
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col gap-4 p-6">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-xl md:text-2xl font-medium text-[#333333] line-clamp-2 hover:text-shadow transition-colors">
            {product.name}
          </h3>
        </Link>

        <StarRating
          rating={product.averageRating}
          totalReviews={product.totalReviews}
          showNumber
          size="sm"
        />

        {defaultVariant && (
          <>
            <p className="text-xl md:text-2xl font-medium text-[#333333]">
              ₹{defaultVariant.sellingPrice}
            </p>
            <p className="text-lg md:text-xl text-[#333333] font-light">
              Delivery in 7 days
            </p>
          </>
        )}

        <button
          onClick={handleAddToCart}
          className="w-full bg-primary_button text-[#333333] font-medium text-xl md:text-2xl py-4 md:py-5 rounded-[40px] hover:bg-[#3AB586] transition-colors"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
