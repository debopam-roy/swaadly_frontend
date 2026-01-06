import { httpClient } from '../api/http-client';
import type {
  ValidateCouponRequest,
  CouponValidationResponse,
  UserCouponsResponse,
  PublicCoupon,
} from '../types/coupon.types';

class CouponsService {
  private readonly basePath = '/coupons';

  /**
   * Validate a coupon code against the cart
   * Rate limited: 10 attempts per minute
   */
  async validateCoupon(
    request: ValidateCouponRequest
  ): Promise<CouponValidationResponse> {
    return httpClient.post<CouponValidationResponse>(
      `${this.basePath}/validate`,
      request,
      { requiresAuth: true }
    );
  }

  /**
   * Get user's available coupons (personal + public)
   * Requires authentication
   */
  async getMyCoupons(): Promise<UserCouponsResponse> {
    return httpClient.get<UserCouponsResponse>(`${this.basePath}/my-coupons`, {
      requiresAuth: true,
    });
  }

  /**
   * Get all active public coupons
   * No authentication required
   */
  async getPublicCoupons(): Promise<PublicCoupon[]> {
    return httpClient.get<PublicCoupon[]>(`${this.basePath}/public`);
  }
}

export const couponsService = new CouponsService();
