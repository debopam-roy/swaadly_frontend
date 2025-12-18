import { httpClient } from '../api/http-client';
import { storage } from '../utils/storage.util';
import type {
  EmailOtpRequest,
  VerifyEmailOtpRequest,
  EmailPhoneAuthResponse,
  EmailOtpInitResponse,
} from '../types/email-phone-auth.types';
import type { User } from '../types/auth.types';

/**
 * Email Authentication Service
 *
 * Independent service for email-based authentication.
 * Completely decoupled from other auth methods.
 *
 * Flow:
 * 1. requestEmailOtp(email) - Sends OTP to email
 * 2. verifyEmailOtp(email, otp) - Verifies email OTP and returns JWT tokens
 * 3. User authenticated with tokens
 *
 * Note: This is simplified - no phone verification required during authentication.
 * For phone verification, use the separate verification API after login.
 */
class EmailPhoneAuthService {
  /**
   * Step 1: Request OTP to be sent to email
   * @param email - User's email address
   * @returns Response with OTP sent confirmation
   */
  async requestEmailOtp(email: string): Promise<EmailOtpInitResponse> {
    const response = await httpClient.post<EmailOtpInitResponse>(
      '/auth/email/request-otp',
      { email } as EmailOtpRequest
    );
    return response;
  }

  /**
   * Step 2: Verify email OTP and complete authentication
   * @param email - User's email address
   * @param emailOtp - OTP received via email
   * @returns Authentication response with tokens and user data
   */
  async verifyEmailOtp(email: string, emailOtp: string): Promise<EmailPhoneAuthResponse> {
    const response = await httpClient.post<EmailPhoneAuthResponse>(
      '/auth/email/verify',
      { email, emailOtp }
    );

    this.storeAuthData(response);
    return response;
  }

  /**
   * DEPRECATED: Use verifyEmailOtp() instead
   * @deprecated The new flow doesn't require phone verification during authentication
   */
  async verifyEmailAndPhone(data: VerifyEmailOtpRequest): Promise<EmailPhoneAuthResponse> {
    console.warn('This method is deprecated. Use verifyEmailOtp(email, emailOtp) instead.');
    return this.verifyEmailOtp(data.email, data.emailOtp);
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
  private storeAuthData(authResponse: EmailPhoneAuthResponse): void {
    storage.setAccessToken(authResponse.accessToken);
    storage.setRefreshToken(authResponse.refreshToken);
    storage.setUser(authResponse.user);
  }
}

export const emailPhoneAuthService = new EmailPhoneAuthService();
