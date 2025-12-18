import { httpClient } from '../api/http-client';
import { storage } from '../utils/storage.util';
import type { User } from '../types/auth.types';

interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Token Management Service
 *
 * Shared service for token operations (refresh, logout).
 * Independent of authentication method used.
 */
class TokenService {
  /**
   * Refresh access token using refresh token
   * @returns New access token
   */
  async refreshAccessToken(): Promise<{ accessToken: string }> {
    const refreshToken = storage.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await httpClient.post<{ accessToken: string }>(
      '/auth/refresh',
      { refreshToken } as RefreshTokenRequest
    );

    storage.setAccessToken(response.accessToken);
    return response;
  }

  /**
   * Logout user and revoke tokens
   * Works regardless of which auth method was used
   */
  async logout(): Promise<void> {
    const refreshToken = storage.getRefreshToken();
    if (refreshToken) {
      try {
        await httpClient.post('/auth/logout', { refreshToken } as RefreshTokenRequest);
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
    storage.clearAuth();
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
   * Get current access token
   * @returns Access token or null
   */
  getAccessToken(): string | null {
    return storage.getAccessToken();
  }

  /**
   * Get current refresh token
   * @returns Refresh token or null
   */
  getRefreshToken(): string | null {
    return storage.getRefreshToken();
  }
}

export const tokenService = new TokenService();
