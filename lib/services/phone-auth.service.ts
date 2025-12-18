import { httpClient } from '../api/http-client';
import { storage } from '../utils/storage.util';
import type {
  PhoneOtpRequest,
  VerifyPhoneOtpRequest,
  PhoneAuthResponse,
  PhoneOtpInitResponse,
} from '../types/phone-auth.types';
import type { User } from '../types/auth.types';

/**
 * Phone-Only Authentication Service
 *
 * Independent service for phone-based authentication.
 * Completely decoupled from other auth methods.
 *
 * Flow:
 * 1. requestPhoneOtp(phone) - Sends OTP to phone
 * 2. verifyPhoneOtp(data) - Verifies phone OTP
 * 3. User authenticated with tokens
 */
class PhoneAuthService {
  /**
   * Step 1: Request OTP to be sent to phone
   * @param phone - User's phone number (with country code)
   * @returns Response with OTP sent confirmation
   */
  async requestPhoneOtp(phone: string): Promise<PhoneOtpInitResponse> {
    const response = await httpClient.post<PhoneOtpInitResponse>(
      '/auth/phone/request-otp',
      { phone } as PhoneOtpRequest
    );
    return response;
  }

  /**
   * Step 2: Verify phone OTP and complete authentication
   * @param data - Phone number and OTP
   * @returns Authentication response with tokens and user data
   */
  async verifyPhoneOtp(data: VerifyPhoneOtpRequest): Promise<PhoneAuthResponse> {
    const response = await httpClient.post<PhoneAuthResponse>(
      '/auth/phone/verify',
      data
    );

    this.storeAuthData(response);
    return response;
  }

  /**
   * Get current authenticated user
   * @returns User object or null if not authenticated
   */
  getCurrentUser(): User | null {
    return storage.getUser<User>();
  }

  /**
   * Check if user is authenticated
   * @returns Boolean indicating authentication status
   */
  isAuthenticated(): boolean {
    const token = storage.getAccessToken();
    const user = storage.getUser<User>();
    return !!token && !!user;
  }

  /**
   * Clear authentication data
   * Used internally and for logout
   */
  clearAuthData(): void {
    storage.clearAuth();
  }

  /**
   * Store authentication data in local storage
   * @param authResponse - Response containing tokens and user data
   */
  private storeAuthData(authResponse: PhoneAuthResponse): void {
    storage.setAccessToken(authResponse.accessToken);
    storage.setRefreshToken(authResponse.refreshToken);
    storage.setUser(authResponse.user);
  }
}

export const phoneAuthService = new PhoneAuthService();
