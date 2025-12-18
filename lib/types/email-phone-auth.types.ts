import type { User, AuthTokens } from './auth.types';

export interface EmailOtpRequest {
  email: string;
}

export interface VerifyEmailOtpRequest {
  email: string;
  emailOtp: string;
  phone: string;
  phoneOtp: string;
}

export interface EmailPhoneAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface EmailOtpInitResponse {
  message: string;
  requiresOtp: boolean;
  nextStep: string;
  otpSentTo: string;
}
