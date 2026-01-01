import { httpClient } from '../api/http-client';
import { storage } from '../utils/storage.util';
import { env } from '../config/env';
import type {
  UserWithProfile,
  UpdateUserProfileRequest,
  CompleteOnboardingRequest,
  UserProfile,
} from '../types/user.types';

class UserService {
  async getCurrentUser(): Promise<UserWithProfile> {
    return httpClient.get<UserWithProfile>('/users/me', {
      requiresAuth: true,
    });
  }

  async updateProfile(
    data: UpdateUserProfileRequest
  ): Promise<{ message: string; profile: UserProfile }> {
    return httpClient.put<{ message: string; profile: UserProfile }>(
      '/users/profile',
      data,
      { requiresAuth: true }
    );
  }

  async completeOnboarding(
    data: CompleteOnboardingRequest
  ): Promise<{ message: string; profile: UserProfile }> {
    return httpClient.put<{ message: string; profile: UserProfile }>(
      '/users/onboarding/complete',
      data,
      { requiresAuth: true }
    );
  }

  /**
   * Upload profile photo
   * Uses multipart/form-data instead of JSON
   */
  async uploadProfilePhoto(
    file: File
  ): Promise<{ message: string; avatarUrl: string; profile: UserProfile }> {
    const token = storage.getAccessToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const formData = new FormData();
    formData.append('photo', file);

    const response = await fetch(`${env.API_BASE_URL}/users/profile/photo`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type, let browser set it with boundary for multipart
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to upload photo');
    }

    return response.json();
  }
}

export const userService = new UserService();
