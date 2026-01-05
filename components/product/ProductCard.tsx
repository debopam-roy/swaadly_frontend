'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types/product.types';
import StarRating from './StarRating';
import { useDeviceType } from '@/lib/hooks/use-device-type';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const defaultVariant = product.variants?.find((v) => v.isDefault) || product.variants?.[0];
  const deviceType = useDeviceType();

  // Select image based on device type and primary flag
  const deviceSpecificImage = product.images?.find(
    (img) => img.deviceType === deviceType && img.isPrimary
  );
  const fallbackImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];
  const displayImage = deviceSpecificImage || fallbackImage;

  const rating = product.averageRating;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  return (
    <Link href={`/products/${product.slug}`} className="flex flex-col h-full bg-white border-[1] border-black rounded-[36px] overflow-hidden cursor-pointer">
      {/* Product Image */}
      <div className="relative w-full aspect-[4/3]">
        {displayImage && (
          <Image
            src={displayImage.imageUrl}
            alt={displayImage.altText || product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col grow gap-3 p-6">
        <h3 className="text-xl md:text-2xl font-medium line-clamp-2 hover:text-shadow transition-colors">
          {product.name}
        </h3>

        {/* Star Rating */}
        <StarRating rating={rating ?? 0} size="sm" showNumber={true} />

        {/* Price */}
        {defaultVariant && (
          <p className="text-2xl md:text-3xl font-medium ">
            ₹{defaultVariant.sellingPrice}
          </p>
        )}

        <button
          onClick={handleAddToCart}
          className="w-full mt-auto bg-primary_button font-medium text-xl md:text-2xl py-4 md:py-5 rounded-[40px] cursor-pointer"
        >
          Buy now
        </button>
      </div>
    </Link>
  );
}
