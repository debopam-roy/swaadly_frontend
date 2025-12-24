'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/lib/types/cart.types';
import { useDeviceType } from '@/lib/hooks/use-device-type';
import StarRating from '@/components/product/StarRating';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemove: (itemId: string) => void;
}

export default function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const { product, variant, quantity } = item;
  const deviceType = useDeviceType();

  // Use cart-specific images based on device type, fallback to product images
  const cartImage = product.cartImages?.find((img) => img.deviceType === deviceType)
    || product.cartImages?.[0];
  const fallbackImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];
  const displayImage = cartImage || fallbackImage;

  const rating = product.averageRating ?? 0;

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(item.id, quantity - 1);
    } else {
      onRemove(item.id);
    }
  };

  const handleIncrease = () => {
    if (quantity < variant.stockQuantity) {
      onQuantityChange(item.id, quantity + 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      {/* Product Image Container */}
      <div className="w-full md:w-[40%] relative">
        <div className="aspect-[2/1] md:aspect-[3/2] relative">
          {displayImage && (
            <Image
              src={displayImage.imageUrl}
              alt={displayImage.altText || product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="w-full md:w-[60%] p-4 md:p-5 lg:p-6 flex flex-col justify-start gap-1 md:gap-1.5 bg-white relative">
        {/* Delete Button */}
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Remove item from cart"
        >
          <Image
            src="/images/delete.svg"
            alt="Delete"
            width={18}
            height={18}
            className="md:w-5 md:h-5 text-gray-500"
          />
        </button>

        {/* Product Name */}
        <h3 className="text-lg md:text-xl lg:text-3xl font-medium leading-tight">
          {product.name}
          {variant.weight && (
            <span className="text-base md:text-lg lg:text-xl"> ({variant.weight}{variant.weightUnit})</span>
          )}
        </h3>

        {/* Star Rating */}
        <StarRating rating={rating} size="sm" showNumber={true} />

        {/* Delivery Info */}
        <p className=" text-[#666666]">
          Delivery in 7 days
        </p>

        {/* Price */}
        <p className="text-xl md:text-2xl lg:text-3xl font-medium ">
          ₹{variant.sellingPrice}
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2 md:gap-x-4">
          <span className="text-sm md:text-base font-medium ">
            Quantity
          </span>
          <div className="flex items-center bg-[#F5F5F5] rounded-full w-2/3 justify-between">
            <button
              onClick={handleDecrease}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-full transition-colors"
              aria-label={quantity === 1 ? "Remove item" : "Decrease quantity"}
            >
              <Image
                src={quantity === 1 ? "/images/delete.svg" : "/images/remove.svg"}
                alt={quantity === 1 ? "Remove" : "Decrease"}
                width={16}
                height={16}
                className="md:w-5 md:h-5"
              />
            </button>

            <span className="w-8 md:w-10 text-center text-sm md:text-base font-medium ">
              {quantity}
            </span>

            <button
              onClick={handleIncrease}
              disabled={quantity >= variant.stockQuantity}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center disabled:opacity-40 cursor-pointer hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Increase quantity"
            >
              <Image src="/images/add.svg" alt="Increase" width={16} height={16} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
