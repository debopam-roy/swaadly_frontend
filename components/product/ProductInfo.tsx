'use client';

import { useState } from 'react';
import { Product, ProductVariant } from '@/lib/types/product.types';
import { useCart } from '@/lib/contexts/cart.context';
import StarRating from './StarRating';
import QuantitySelector from './QuantitySelector';

interface ProductInfoProps {
  product: Product;
  onAddToCart?: (variantId: string, quantity: number) => void;
  onBuyNow: (variantId: string, quantity: number) => void;
}

export default function ProductInfo({ product, onAddToCart, onBuyNow }: ProductInfoProps) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants?.find((v) => v.isDefault) || product.variants?.[0] || ({} as ProductVariant)
  );
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

  const discountAmount = selectedVariant?.mrp - selectedVariant?.sellingPrice;
  const hasCoupon = selectedVariant?.couponCode && selectedVariant?.couponAppliedPrice;

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Product Name */}
      <p className="text-2xl md:text-4xl font-semibold">{product.name}</p>

      {/* Product Details */}
      <div className="flex items-center gap-4 flex-wrap text-base md:text-2xl">
        {product.proteinPer100g && (
          <>
            <span>Protein {product.proteinPer100g}g</span>
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
      <StarRating
        rating={product.averageRating}
        totalReviews={product.totalReviews}
      />

      {/* Pricing with Coupon */}
      {hasCoupon && (
        <div className="flex flex-col gap-3">
          <p className="text-sm md:text-base text-[#44c997] font-medium">
            Coupon code &quot;{selectedVariant.couponCode}&quot; applied
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xl md:text-3xl font-medium text-gray-400 line-through">
              ₹{selectedVariant.mrp}
            </span>
            <span className="text-2xl md:text-4xl font-bold ">
              ₹{selectedVariant.couponAppliedPrice}
            </span>
          </div>
        </div>
      )}

      {/* Pricing without Coupon */}
      {!hasCoupon && selectedVariant && (
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
            className="flex-1 border-2 font-medium text-base md:text-lg py-4 md:py-5 rounded-full hover:bg-[#F5EDE0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            disabled={!selectedVariant?.isAvailable}
            className="flex-1 bg-[#44c997]  font-medium text-base md:text-lg py-4 md:py-5 rounded-full hover:bg-[#3AB586] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  onClick={() => setSelectedVariant(variant)}
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
