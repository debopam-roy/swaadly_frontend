import { env } from '../config/env';
import { storage } from '../utils/storage.util';
import type { ApiError } from '../types/auth.types';

interface RequestConfig extends RequestInit {
  requiresAuth?: boolean;
}

class HttpClient {
  private baseURL: string;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async refreshAccessToken(): Promise<string | null> {
    const refreshToken = storage.getRefreshToken();
    if (!refreshToken) {
      return null;
    }

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      storage.setAccessToken(data.accessToken);
      return data.accessToken;
    } catch (error) {
      storage.clearAuth();
      return null;
    }
  }

  private subscribeTokenRefresh(callback: (token: string) => void): void {
    this.refreshSubscribers.push(callback);
  }

  private onRefreshed(token: string): void {
    this.refreshSubscribers.forEach((callback) => callback(token));
    this.refreshSubscribers = [];
  }

  private async handleUnauthorized(): Promise<string | null> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      const newToken = await this.refreshAccessToken();
      this.isRefreshing = false;
      this.onRefreshed(newToken || '');
      return newToken;
    }

    return new Promise((resolve) => {
      this.subscribeTokenRefresh((token: string) => {
        resolve(token);
      });
    });
  }

  async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { requiresAuth = false, headers = {}, ...rest } = config;

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(headers as Record<string, string>),
    };

    if (requiresAuth) {
      const token = storage.getAccessToken();
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...rest,
        headers: requestHeaders,
      });

      if (response.status === 401 && requiresAuth) {
        const newToken = await this.handleUnauthorized();
        if (newToken) {
          requestHeaders['Authorization'] = `Bearer ${newToken}`;
          const retryResponse = await fetch(url, {
            ...rest,
            headers: requestHeaders,
          });

          if (!retryResponse.ok) {
            throw await this.handleErrorResponse(retryResponse);
          }

          return retryResponse.json();
        } else {
          window.location.href = '/auth/login';
          throw new Error('Session expired');
        }
      }

      if (!response.ok) {
        throw await this.handleErrorResponse(response);
      }

      return response.json();
    } catch (error) {
      throw this.normalizeError(error);
    }
  }

  private async handleErrorResponse(response: Response): Promise<ApiError> {
    try {
      const errorData = await response.json();

      // Handle nested message object (NestJS ForbiddenException with object payload)
      const messageData = errorData.message;
      const isNestedMessage = typeof messageData === 'object' && messageData !== null;

      return {
        statusCode: response.status,
        message: isNestedMessage ? messageData.message : (messageData || 'An error occurred'),
        error: errorData.error,
        code: isNestedMessage ? messageData.code : errorData.code,
      };
    } catch {
      return {
        statusCode: response.status,
        message: response.statusText || 'An error occurred',
      };
    }
  }

  private normalizeError(error: unknown): ApiError {
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      return error as ApiError;
    }

    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }

  get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const httpClient = new HttpClient(env.API_BASE_URL);
