'use client';

import { useRouter } from 'next/navigation';
import { OtpAuthForm } from './otp-auth-form';
import { emailPhoneAuthService } from '@/lib';
import { useAuth } from '@/lib/contexts/auth.context';

/**
 * Email Authentication Flow Component
 *
 * Follows SOLID principles:
 * - Single Responsibility: Handles email auth logic only
 * - Dependency Inversion: Uses injected service
 *
 * Follows YAGNI: Only implements what's needed for email auth
 */

interface EmailAuthFlowProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function EmailAuthFlow({ onSuccess, onError }: EmailAuthFlowProps) {
  const router = useRouter();
  const { checkAuth } = useAuth();

  // Email validation
  const validateEmail = (email: string): string | null => {
    if (!email) {
      return 'Email is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }

    return null;
  };

  // Request OTP handler
  const handleRequestOtp = async (email: string) => {
    try {
      await emailPhoneAuthService.requestEmailOtp(email);
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || error.message || 'Failed to send OTP');
      onError?.(err);
      throw err;
    }
  };

  // Verify OTP handler
  const handleVerifyOtp = async (email: string, otp: string) => {
    try {
      await emailPhoneAuthService.verifyEmailOtp(email, otp);

      // Update auth context with user data before calling onSuccess
      await checkAuth();

      // Success - let onSuccess callback handle navigation (e.g., to onboarding or home)
      await onSuccess?.();
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || error.message || 'Invalid OTP');
      onError?.(err);
      throw err;
    }
  };

  return (
    <OtpAuthForm
      title="Sign in with Email"
      inputLabel="Email Address"
      inputPlaceholder="you@example.com"
      inputType="email"
      validateInput={validateEmail}
      onRequestOtp={handleRequestOtp}
      onVerifyOtp={handleVerifyOtp}
    />
  );
}
