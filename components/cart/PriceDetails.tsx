'use client';

import { CartSummary } from '@/lib/types/cart.types';

interface PriceDetailsProps {
  summary: CartSummary;
  itemCount: number;
  onBuyNow: () => void;
}

export default function PriceDetails({ summary, itemCount, onBuyNow }: PriceDetailsProps) {
  return (
    <div className="bg-white p-4 md:p-6 flex flex-col gap-4 md:gap-6 rounded-xl">
      {/* Price Breakdown */}
      <div className="flex flex-col gap-3 md:gap-4">
        <h3 className="text-lg md:text-xl font-medium ">
          Price Details ({itemCount} Item{itemCount !== 1 ? 's' : ''})
        </h3>

        <div className="flex flex-col gap-2 md:gap-3">
          <div className="flex justify-between items-center text-sm md:text-base ">
            <span>Total MRP</span>
            <span>₹{summary.totalMRP.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center text-sm md:text-base ">
            <span>Discount on MRP</span>
            <span>₹{summary.discountOnMRP.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center text-sm md:text-base ">
            <span>Coupon Discount</span>
            <span>₹{summary.couponDiscount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-black" />

      {/* Subtotal and Buy Now */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-lg md:text-xl font-medium ">
              Subtotal
            </h4>
            <span className="text-lg md:text-xl font-medium ">:</span>
            <span className="text-lg md:text-xl font-bold ">
              ₹{summary.subtotal.toFixed(2)}
            </span>
          </div>
          <p className="text-xs md:text-sm text-[#666666]">
            Delivery in {summary.deliveryDays} days
          </p>
        </div>

        <button
          onClick={onBuyNow}
          className="bg-primary_button font-medium text-sm md:text-base px-6 md:px-10 py-3 md:py-3.5 rounded-full cursor-pointer"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
