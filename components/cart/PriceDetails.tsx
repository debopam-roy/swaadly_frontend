'use client';

import { CartSummary } from '@/lib/types/cart.types';

interface PriceDetailsProps {
  summary: CartSummary;
  itemCount: number;
  onBuyNow: () => void;
}

export default function PriceDetails({ summary, itemCount, onBuyNow }: PriceDetailsProps) {
  return (
    <div className="bg-white p-6 md:p-8 flex flex-col gap-6 md:gap-10">
      {/* Price Breakdown */}
      <div className="flex flex-col gap-4 md:gap-6">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#333333]">
          Price Details ({itemCount} Item{itemCount !== 1 ? 's' : ''})
        </h3>

        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex justify-between items-center text-xl md:text-2xl lg:text-3xl text-[#333333]">
            <span className="font-normal">Total MRP</span>
            <span className="font-normal">₹{summary.totalMRP.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center text-xl md:text-2xl lg:text-3xl text-[#333333]">
            <span className="font-normal">Discount on MRP</span>
            <span className="font-normal">₹{summary.discountOnMRP.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center text-xl md:text-2xl lg:text-3xl text-[#333333]">
            <span className="font-normal">Coupon Discount</span>
            <span className="font-normal">₹{summary.couponDiscount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[2px] bg-[#333333]" />

      {/* Subtotal and Buy Now */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 md:items-center">
        <div className="flex flex-col gap-2 md:gap-4 flex-1">
          <div className="flex items-center gap-3">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#333333]">
              Subtotal
            </h4>
            <span className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#333333]">:</span>
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#333333]">
              ₹{summary.subtotal.toFixed(2)}
            </span>
          </div>
          <p className="text-lg md:text-xl lg:text-2xl font-light text-[#333333]">
            Delivery in {summary.deliveryDays} days
          </p>
        </div>

        <button
          onClick={onBuyNow}
          className="bg-[#44C997] text-[#333333] font-medium text-xl md:text-2xl px-8 md:px-12 lg:px-16 py-4 md:py-5 rounded-[40px] hover:bg-[#3AB586] transition-colors whitespace-nowrap"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
