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
    <div className="bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex flex-col gap-2 md:gap-4">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#333333]">
          Apply Coupons
        </h3>
        <p className="text-lg md:text-xl lg:text-2xl font-light text-[#333333]">
          Get upto <span className="font-medium text-[#FF7E29]">₹{maxDiscount} OFF</span> on first order
        </p>
      </div>

      {appliedCoupon ? (
        <div className="flex items-center gap-4">
          <span className="text-lg md:text-xl text-[#44C997] font-medium">
            Coupon Applied: {appliedCoupon}
          </span>
          <button
            onClick={() => onApplyCoupon('')}
            className="px-8 md:px-12 lg:px-16 py-3 md:py-4 border-2 border-[#44C997] text-[#44C997] rounded-[40px] font-medium text-lg md:text-xl lg:text-2xl hover:bg-[#44C997] hover:text-white transition-colors"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          onClick={handleApply}
          className="px-8 md:px-12 lg:px-16 py-3 md:py-4 border-2 border-[#44C997] text-[#44C997] rounded-[40px] font-medium text-lg md:text-xl lg:text-2xl hover:bg-[#44C997] hover:text-white transition-colors self-start md:self-auto"
        >
          Apply
        </button>
      )}
    </div>
  );
}
