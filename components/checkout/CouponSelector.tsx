'use client';

import { useState, useEffect } from 'react';
import { couponsService } from '@/lib/services/coupons.service';
import {
  CouponDiscountType,
} from '@/lib/types/coupon.types';
import type {
  PublicCoupon,
  PersonalCoupon,
  AppliedCoupon,
  CartItemForValidation,
} from '@/lib/types/coupon.types';

// Unified coupon type for display
interface DisplayCoupon {
  code: string;
  name: string;
  description?: string;
  discountType: CouponDiscountType;
  discountValue: number;
  maxDiscountAmount?: number;
  minOrderAmount?: number;
  validUntil: string;
  isPersonal: boolean;
  isFirstOrderOnly?: boolean;
  isRedeemed?: boolean;
}

interface CouponSelectorProps {
  cartItems: CartItemForValidation[];
  cartTotal: number;
  appliedCoupon: AppliedCoupon | null;
  onCouponApplied: (coupon: AppliedCoupon | null) => void;
  isAuthenticated: boolean;
}

export default function CouponSelector({
  cartItems,
  cartTotal,
  appliedCoupon,
  onCouponApplied,
  isAuthenticated,
}: CouponSelectorProps) {
  const [customCode, setCustomCode] = useState('');
  const [publicCoupons, setPublicCoupons] = useState<PublicCoupon[]>([]);
  const [personalCoupons, setPersonalCoupons] = useState<PersonalCoupon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAllCoupons, setShowAllCoupons] = useState(false);

  // Fetch available coupons on mount
  useEffect(() => {
    fetchCoupons();
  }, [isAuthenticated]);

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      if (isAuthenticated) {
        const response = await couponsService.getMyCoupons();
        setPersonalCoupons(response.personalCoupons);
        setPublicCoupons(response.publicCoupons);
      } else {
        const coupons = await couponsService.getPublicCoupons();
        setPublicCoupons(coupons);
      }
    } catch (err) {
      console.error('Failed to fetch coupons:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const validateAndApplyCoupon = async (code: string) => {
    if (!code.trim()) return;

    setIsValidating(true);
    setError(null);

    try {
      const response = await couponsService.validateCoupon({
        code: code.trim().toUpperCase(),
        cartItems,
        cartTotal,
      });

      if (response.valid) {
        onCouponApplied({
          code: response.code,
          name: response.couponName || response.code,
          discountType: response.discountType!,
          discountValue: response.discountValue!,
          discountAmount: response.discountAmount!,
          couponType: response.couponType!,
          applicableProductIds: response.applicableProductIds,
        });
        setCustomCode('');
        setShowAllCoupons(false);
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to validate coupon');
    } finally {
      setIsValidating(false);
    }
  };

  const handleApplyCustomCode = () => {
    validateAndApplyCoupon(customCode);
  };

  const handleSelectCoupon = (code: string) => {
    validateAndApplyCoupon(code);
  };

  const handleRemoveCoupon = () => {
    onCouponApplied(null);
    setError(null);
  };

  const formatDiscount = (
    discountType: CouponDiscountType,
    discountValue: number,
    maxDiscount?: number
  ) => {
    if (discountType === CouponDiscountType.PERCENTAGE) {
      const maxText = maxDiscount ? ` (upto ₹${maxDiscount})` : '';
      return `${discountValue}% OFF${maxText}`;
    }
    return `₹${discountValue} OFF`;
  };

  const formatValidity = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Combine and display coupons with unified type
  const allCoupons: DisplayCoupon[] = [
    ...personalCoupons.map((c): DisplayCoupon => ({
      code: c.personalCode,
      name: `Personal: ${c.source}`,
      discountType: c.discountType,
      discountValue: c.discountValue,
      maxDiscountAmount: c.maxDiscountAmount,
      minOrderAmount: c.minOrderAmount,
      validUntil: c.validUntil,
      isPersonal: true,
      isRedeemed: c.isRedeemed,
    })),
    ...publicCoupons.map((c): DisplayCoupon => ({
      code: c.code,
      name: c.name,
      description: c.description,
      discountType: c.discountType,
      discountValue: c.discountValue,
      maxDiscountAmount: c.maxDiscountAmount,
      minOrderAmount: c.minOrderAmount,
      validUntil: c.validUntil,
      isPersonal: false,
      isFirstOrderOnly: c.isFirstOrderOnly,
    })),
  ].filter((c) => !c.isRedeemed);

  const displayedCoupons = showAllCoupons ? allCoupons : allCoupons.slice(0, 3);

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-100">
        <h3 className="text-lg md:text-xl font-medium">Apply Coupon</h3>
        <p className="text-sm text-gray-500 mt-1">
          Save more with exclusive discounts
        </p>
      </div>

      {/* Applied Coupon */}
      {appliedCoupon && (
        <div className="p-4 md:p-6 bg-green-50 border-b border-green-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-green-800">
                  {appliedCoupon.code}
                </p>
                <p className="text-sm text-green-600">
                  You save ₹{appliedCoupon.discountAmount.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Custom Code Input */}
      {!appliedCoupon && (
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex gap-3">
            <input
              type="text"
              value={customCode}
              onChange={(e) => {
                setCustomCode(e.target.value.toUpperCase());
                setError(null);
              }}
              placeholder="Enter coupon code"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44C997] focus:border-transparent uppercase"
              disabled={isValidating}
            />
            <button
              onClick={handleApplyCustomCode}
              disabled={!customCode.trim() || isValidating}
              className="px-6 py-3 bg-[#44C997] text-white font-medium rounded-lg hover:bg-[#3AB586] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isValidating ? 'Applying...' : 'Apply'}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      )}

      {/* Available Coupons List */}
      {!appliedCoupon && (
        <div className="p-4 md:p-6">
          <h4 className="text-sm font-medium text-gray-500 mb-4">
            AVAILABLE COUPONS
          </h4>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-2 border-[#44C997] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : allCoupons.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              No coupons available at the moment
            </p>
          ) : (
            <>
              <div className="space-y-3">
                {displayedCoupons.map((coupon) => (
                  <div
                    key={coupon.code}
                    className="border border-gray-200 rounded-lg p-4 hover:border-[#44C997] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-semibold text-[#44C997] bg-green-50 px-2 py-0.5 rounded">
                            {coupon.code}
                          </span>
                          {coupon.isPersonal && (
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                              Personal
                            </span>
                          )}
                          {coupon.isFirstOrderOnly && (
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                              First Order
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium">{coupon.name}</p>
                        {coupon.description && (
                          <p className="text-xs text-gray-500 mt-1">
                            {coupon.description}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500">
                          <span className="font-medium text-green-600">
                            {formatDiscount(
                              coupon.discountType,
                              coupon.discountValue,
                              coupon.maxDiscountAmount
                            )}
                          </span>
                          {coupon.minOrderAmount && (
                            <>
                              <span>•</span>
                              <span>Min order ₹{coupon.minOrderAmount}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>Valid till {formatValidity(coupon.validUntil)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSelectCoupon(coupon.code)}
                        disabled={isValidating}
                        className="px-4 py-2 text-sm font-medium text-[#44C997] border border-[#44C997] rounded-lg hover:bg-[#44C997] hover:text-white transition-colors disabled:opacity-50"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {allCoupons.length > 3 && (
                <button
                  onClick={() => setShowAllCoupons(!showAllCoupons)}
                  className="w-full mt-4 py-3 text-sm font-medium text-[#44C997] hover:bg-green-50 rounded-lg transition-colors"
                >
                  {showAllCoupons
                    ? 'Show Less'
                    : `View All ${allCoupons.length} Coupons`}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
