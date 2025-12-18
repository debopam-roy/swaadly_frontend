import type { User } from './auth.types';

export interface PhoneOtpRequest {
  phone: string;
}

export interface VerifyPhoneOtpRequest {
  phone: string;
  otp: string;
}

export interface PhoneAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface PhoneOtpInitResponse {
  message: string;
  requiresOtp: boolean;
  nextStep: string;
  otpSentTo: string;
}
