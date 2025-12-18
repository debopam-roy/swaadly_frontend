import type { User } from './auth.types';

export interface GoogleAuthRequest {
  idToken: string;
}

export interface GoogleVerifyPhoneRequest {
  email: string;
  googleId: string;
  phone: string;
  otp: string;
}

export interface GoogleAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface GoogleInitResponse {
  message: string;
  requiresOtp: boolean;
  nextStep: string;
  userId?: string;
  otpSentTo?: string;
}

export interface GoogleTokenPayload {
  email: string;
  sub: string;
  name?: string;
  picture?: string;
}
