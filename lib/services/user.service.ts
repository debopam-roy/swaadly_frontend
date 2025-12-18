import { httpClient } from '../api/http-client';
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
}

export const userService = new UserService();
