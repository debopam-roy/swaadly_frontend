// Coupon discount types
export enum CouponDiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

// Coupon types
export enum CouponType {
  GENERAL = 'GENERAL',
  FIRST_ORDER = 'FIRST_ORDER',
  INFLUENCER = 'INFLUENCER',
  USER_SPECIFIC = 'USER_SPECIFIC',
  LOYALTY = 'LOYALTY',
}

// Error codes for programmatic handling
export enum CouponErrorCode {
  CODE_NOT_FOUND = 'CODE_NOT_FOUND',
  CODE_EXPIRED = 'CODE_EXPIRED',
  CODE_EXHAUSTED = 'CODE_EXHAUSTED',
  CODE_INACTIVE = 'CODE_INACTIVE',
  MINIMUM_ORDER_NOT_MET = 'MINIMUM_ORDER_NOT_MET',
  MAX_USES_REACHED = 'MAX_USES_REACHED',
  FIRST_ORDER_ONLY = 'FIRST_ORDER_ONLY',
  NOT_APPLICABLE = 'NOT_APPLICABLE',
  USER_NOT_ELIGIBLE = 'USER_NOT_ELIGIBLE',
}

// Cart item for validation request
export interface CartItemForValidation {
  productId: string;
  variantId: string;
  variantSku: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  unitMrp: number;
  tags?: string[];
}

// Request to validate a coupon
export interface ValidateCouponRequest {
  code: string;
  cartItems: CartItemForValidation[];
  cartTotal: number;
}

// Response from coupon validation
export interface CouponValidationResponse {
  valid: boolean;
  code: string;
  message: string;
  discountType?: CouponDiscountType;
  discountValue?: number;
  discountAmount?: number;
  finalAmount?: number;
  couponType?: CouponType;
  couponName?: string;
  applicableProductIds?: string[];
  errorCode?: CouponErrorCode;
}

// Public coupon for display
export interface PublicCoupon {
  code: string;
  name: string;
  description?: string;
  discountType: CouponDiscountType;
  discountValue: number;
  maxDiscountAmount?: number;
  minOrderAmount?: number;
  validUntil: string;
  couponType: CouponType;
  isFirstOrderOnly: boolean;
}

// User's personal coupon
export interface PersonalCoupon {
  id: string;
  personalCode: string;
  discountType: CouponDiscountType;
  discountValue: number;
  maxDiscountAmount?: number;
  minOrderAmount?: number;
  source: string;
  validFrom: string;
  validUntil: string;
  isRedeemed: boolean;
}

// Response for user's available coupons
export interface UserCouponsResponse {
  personalCoupons: PersonalCoupon[];
  publicCoupons: PublicCoupon[];
}

// Applied coupon state (for UI)
export interface AppliedCoupon {
  code: string;
  name: string;
  discountType: CouponDiscountType;
  discountValue: number;
  discountAmount: number;
  couponType: CouponType;
  applicableProductIds?: string[];
}
