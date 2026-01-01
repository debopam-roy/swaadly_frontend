export interface UserProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
  authId: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatarUrl?: string;
  dateOfBirth?: string;
  preferences: Record<string, any>;
  onboardingCompleted: boolean;
  profileCompletedAt?: string;
}

export interface UpdateUserProfileRequest {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatarUrl?: string;
  dateOfBirth?: string;
  preferences?: Record<string, any>;
}

export interface CompleteOnboardingRequest extends UpdateUserProfileRequest {}

export interface UserWithProfile {
  auth: {
    id: string;
    email?: string;
    phone?: string;
    emailVerified: boolean;
    phoneVerified: boolean;
  };
  profile: UserProfile;
}
