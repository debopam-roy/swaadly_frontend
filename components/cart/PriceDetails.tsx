'use client';

import { CartSummary } from '@/lib/types/cart.types';

interface PriceDetailsProps {
  summary: CartSummary;
  itemCount: number;
  onBuyNow: () => void;
}

export default function PriceDetails({ summary, itemCount, onBuyNow }: PriceDetailsProps) {
  return (
    <div className="bg-white p-4 md:p-6 flex flex-col gap-4 md:gap-6">
      {/* Price Breakdown */}
      <div className="flex flex-col gap-3 md:gap-4">
        <h3 className="text-lg md:text-xl font-medium text-[#333333]">
          Price Details ({itemCount} Item{itemCount !== 1 ? 's' : ''})
        </h3>

        <div className="flex flex-col gap-2 md:gap-3">
          <div className="flex justify-between items-center text-sm md:text-base text-[#333333]">
            <span>Total MRP</span>
            <span>₹{summary.totalMRP.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center text-sm md:text-base text-[#333333]">
            <span>Discount on MRP</span>
            <span>₹{summary.discountOnMRP.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center text-sm md:text-base text-[#333333]">
            <span>Coupon Discount</span>
            <span>₹{summary.couponDiscount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#333333]" />

      {/* Subtotal and Buy Now */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-lg md:text-xl font-medium text-[#333333]">
              Subtotal
            </h4>
            <span className="text-lg md:text-xl font-medium text-[#333333]">:</span>
            <span className="text-lg md:text-xl font-bold text-[#333333]">
              ₹{summary.subtotal.toFixed(2)}
            </span>
          </div>
          <p className="text-xs md:text-sm text-[#666666]">
            Delivery in {summary.deliveryDays} days
          </p>
        </div>

        <button
          onClick={onBuyNow}
          className="bg-[#44C997] text-[#333333] font-medium text-sm md:text-base px-6 md:px-10 py-3 md:py-3.5 rounded-full hover:bg-[#3AB586] transition-colors whitespace-nowrap"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
