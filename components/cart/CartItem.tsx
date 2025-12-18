'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/lib/types/cart.types';
import StarRating from '@/components/product/StarRating';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemove: (itemId: string) => void;
}

export default function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const { product, variant, quantity } = item;
  const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(item.id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < variant.stockQuantity) {
      onQuantityChange(item.id, quantity + 1);
    }
  };

  return (
    <div className="bg-[#333333] flex flex-col md:flex-row overflow-hidden">
      {/* Product Image */}
      <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto md:h-auto">
        {primaryImage && (
          <Image
            src={primaryImage.imageUrl}
            alt={primaryImage.altText || product.name}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2 bg-white p-6 md:p-8 flex flex-col gap-4">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#333333] leading-tight">
          {product.name}
        </h3>

        <StarRating
          rating={product.averageRating}
          totalReviews={product.totalReviews}
          showNumber
          size="sm"
        />

        <p className="text-lg md:text-xl font-light text-[#333333]">
          Delivery in 7 days
        </p>

        <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#333333]">
          ₹{variant.sellingPrice}
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 md:gap-8">
          <span className="text-xl md:text-2xl lg:text-3xl font-medium text-[#333333]">
            Quantity
          </span>
          <div className="flex items-center bg-[rgba(51,51,51,0.1)] rounded-[40px] px-4 py-3 gap-4 flex-1 md:flex-none md:min-w-[180px]">
            <button
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center disabled:opacity-30"
              aria-label="Decrease quantity"
            >
              <Image src="/images/remove.svg" alt="Decrease" width={24} height={24} />
            </button>
            <span className="flex-1 text-center text-lg md:text-xl font-medium text-[#333333]">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              disabled={quantity >= variant.stockQuantity}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center disabled:opacity-30"
              aria-label="Increase quantity"
            >
              <Image src="/images/add.svg" alt="Increase" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
