import { httpClient } from '../api/http-client';
import { storage } from '../utils/storage.util';
import type {
  GoogleAuthRequest,
  GoogleVerifyPhoneRequest,
  GoogleAuthResponse,
  GoogleInitResponse,
} from '../types/google-auth.types';
import type { User } from '../types/auth.types';

/**
 * Google Authentication Service
 *
 * Independent service for Google OAuth authentication.
 * Completely decoupled from other auth methods.
 *
 * Flow:
 * 1. verifyGoogleToken(idToken) - Verify Google ID token and get JWT tokens immediately
 * 2. User authenticated with tokens
 *
 * Note: This is simplified - no phone verification required during authentication.
 * For phone verification, use the separate verification API after login.
 */
class GoogleAuthService {
  /**
   * Verify Google ID token and complete authentication
   * @param idToken - Google ID token from Google Sign-In
   * @returns Authentication response with tokens and user data
   */
  async verifyGoogleToken(idToken: string): Promise<GoogleAuthResponse> {
    const response = await httpClient.post<GoogleAuthResponse>(
      '/auth/google/verify',
      { idToken } as GoogleAuthRequest
    );

    this.storeAuthData(response);
    return response;
  }

  /**
   * DEPRECATED: Phone verification is now handled separately via /verification endpoints
   * @deprecated Use verification API endpoints instead
   */
  async requestPhoneOtp(phone: string): Promise<{ message: string }> {
    console.warn('This method is deprecated. Use verification API endpoints instead.');
    const response = await httpClient.post<{ message: string }>(
      '/verification/phone/request-otp',
      { phone }
    );
    return response;
  }

  /**
   * DEPRECATED: Use the new simplified flow - verifyGoogleToken() returns tokens immediately
   * @deprecated Use verifyGoogleToken() directly instead
   */
  async completeGoogleAuth(data: GoogleVerifyPhoneRequest): Promise<GoogleAuthResponse> {
    console.warn('This method is deprecated. Use verifyGoogleToken() directly instead.');
    throw new Error('This authentication flow is no longer supported. Use verifyGoogleToken() instead.');
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
  private storeAuthData(authResponse: GoogleAuthResponse): void {
    storage.setAccessToken(authResponse.accessToken);
    storage.setRefreshToken(authResponse.refreshToken);
    storage.setUser(authResponse.user);
  }
}

export const googleAuthService = new GoogleAuthService();
