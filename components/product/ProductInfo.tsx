'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product, ProductVariant } from '@/lib/types/product.types';
import { useCart } from '@/lib/contexts/cart.context';
import QuantitySelector from './QuantitySelector';

interface ProductInfoProps {
  product: Product;
  selectedVariant: ProductVariant | null;
  onVariantChange: (variant: ProductVariant) => void;
  onAddToCart?: (variantId: string, quantity: number) => void;
  onBuyNow: (variantId: string, quantity: number) => void;
}

export default function ProductInfo({ product, selectedVariant, onVariantChange, onAddToCart, onBuyNow }: ProductInfoProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (selectedVariant?.id) {
      // Add to cart using the cart context
      addToCart(product, selectedVariant, quantity);

      // Call the optional callback if provided
      if (onAddToCart) {
        onAddToCart(selectedVariant.id, quantity);
      }

      // Reset quantity to 1 after adding
      setQuantity(1);
    }
  };

  const handleBuyNow = () => {
    if (selectedVariant?.id) {
      // Add to cart first
      addToCart(product, selectedVariant, quantity);

      // Then proceed to checkout
      onBuyNow(selectedVariant.id, quantity);
    }
  };

  const discountAmount = (selectedVariant?.mrp ?? 0) - (selectedVariant?.sellingPrice ?? 0);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  // Use actual product rating from backend (defaults to 0.0 if not available)
  const rating = product.averageRating || 0.0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Product Name */}
      <div className='flex items-center justify-between'>
        <div>
          <p className="text-3xl md:text-5xl font-semibold">
            {product.name}
          </p>
        </div>

        <button
          onClick={handleShare}
          className="w-10 h-10 cursor-pointer"
          aria-label="Share product"
        >
          <Image src="/images/share.svg" alt="Share" width={28} height={28} />
        </button>
      </div>

      {/* Product Details */}
      <div className="flex items-center gap-4 flex-wrap text-base md:text-2xl">
        {selectedVariant?.proteinQuantity && (
          <>
            <span>Protein {selectedVariant.proteinQuantity}g</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
          </>
        )}
        {selectedVariant && (
          <span>
            Net weight {selectedVariant.weight}
            {selectedVariant.weightUnit}
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {/* Filled Stars */}
          {Array.from({ length: fullStars }).map((_, i) => (
            <div key={`filled-${i}`} className="w-6 h-6 md:w-8 md:h-8 relative">
              <Image
                src="/images/filled_star.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          ))}

          {/* Half Star (shown as empty for partial ratings) */}
          {hasHalfStar && (
            <div className="w-6 h-6 md:w-8 md:h-8 relative">
              <Image
                src="/images/empty_star.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          )}

          {/* Empty Stars */}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <div key={`empty-${i}`} className="w-6 h-6 md:w-8 md:h-8 relative">
              <Image
                src="/images/empty_star.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
        <span className="font-medium text-xl md:text-2xl ">
          {rating.toFixed(1)}
        </span>
      </div>

      {/* Pricing */}
      {selectedVariant && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            {discountAmount > 0 && (
              <span className="text-xl md:text-3xl font-medium text-gray-400 line-through">
                ₹{selectedVariant.mrp}
              </span>
            )}
            <span className="text-2xl md:text-4xl font-bold ">
              ₹{selectedVariant.sellingPrice}
            </span>
          </div>
        </div>
      )}

      <div className='flex flex-col gap-4 md:gap-6 w-full'>
        {/* Quantity Selector */}
        <QuantitySelector
          quantity={quantity}
          onIncrease={() => setQuantity((prev) => Math.min(prev + 1, selectedVariant?.stockQuantity || 99))}
          onDecrease={() => setQuantity((prev) => Math.max(prev - 1, 1))}
          maxQuantity={selectedVariant?.stockQuantity || 99}
        />

        {/* Action Buttons */}
        <div className="flex gap-4 w-full">
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant?.isAvailable}
            className="flex-1 border-[1] font-medium text-base md:text-lg py-4 md:py-5 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            disabled={!selectedVariant?.isAvailable}
            className="flex-1 bg-primary_button font-medium text-base md:text-lg py-4 md:py-5 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Buy Now
          </button>
        </div>
      </div>

        {/* Variant Selector */}
        {product.variants && product.variants.length > 1 && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => onVariantChange(variant)}
                  disabled={!variant.isAvailable}
                  className={`flex flex-col items-center justify-between rounded-xl border-[1] border-b-4 transition-all min-w-22 ${
                    selectedVariant?.id === variant.id
                      ? 'border-[#44c997] bg-[#E3E3CC] border-b-[#2B9A70]'
                      : 'border-[#bcbcbc] bg-[#FBF8F8] border-b-black'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="flex flex-col items-center gap-2 pt-2.5">
                    <span className="text-sm text-gray-700">Weight</span>
                    <span className="text-lg ">
                      {variant.weight}
                      {variant.weightUnit}
                    </span>
                  </div>
                  <div className="mt-2 pt-2 w-full border-t-[1] border-t-gray-300 bg-white text-center pb-2 rounded-b-xl">
                    <span className="text-base font-medium ">
                      ₹{variant.sellingPrice}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}
