import { Product, ProductVariant } from './product.types';

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  addedAt: Date;
}

export interface CartSummary {
  totalMRP: number;
  discountOnMRP: number;
  couponDiscount: number;
  subtotal: number;
  deliveryDays: number;
}

export interface Coupon {
  code: string;
  description: string;
  discountAmount: number;
  discountPercentage?: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  validUntil?: Date;
}
