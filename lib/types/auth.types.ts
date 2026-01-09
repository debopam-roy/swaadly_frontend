export interface User {
  id: string;
  email?: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface InitiateAuthResponse {
  message: string;
  requiresOtp: boolean;
  nextStep: string;
  userId?: string;
  otpSentTo?: string;
}

export interface PhoneOtpRequest {
  phone: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
  code?: string;
}
