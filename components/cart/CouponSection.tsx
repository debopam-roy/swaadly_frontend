'use client';

import { useState } from 'react';

interface CouponSectionProps {
  onApplyCoupon: (code: string) => void;
  appliedCoupon?: string;
  maxDiscount?: number;
}

export default function CouponSection({ onApplyCoupon, appliedCoupon, maxDiscount = 300 }: CouponSectionProps) {
  const [couponCode, setCouponCode] = useState('');

  const handleApply = () => {
    if (couponCode.trim()) {
      onApplyCoupon(couponCode.trim());
      setCouponCode('');
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg md:text-xl font-medium ">
          Apply Coupons
        </h3>
        <p className="text-sm md:text-base ">
          Get upto <span className="font-medium text-[#FF7E29]">₹{maxDiscount} OFF</span> on first order
        </p>
      </div>

      {appliedCoupon ? (
        <div className="flex items-center gap-3">
          <span className="text-sm md:text-base text-[#44C997] font-medium">
            Coupon Applied: {appliedCoupon}
          </span>
          <button
            onClick={() => onApplyCoupon('')}
            className="px-6 md:px-8 py-2 md:py-2.5 border-2 border-[#44C997] text-[#44C997] rounded-full font-medium text-sm md:text-base hover:bg-[#44C997] hover:text-white transition-colors"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          onClick={handleApply}
          className="px-6 md:px-8 py-2 md:py-2.5 border-2 border-[#44C997] text-[#44C997] rounded-full font-medium text-sm md:text-base hover:bg-[#44C997] hover:text-white transition-colors self-start md:self-auto"
        >
          Apply
        </button>
      )}
    </div>
  );
}
