'use client';

import { useRouter } from 'next/navigation';
import { OtpAuthForm } from './otp-auth-form';
import { phoneAuthService, toastService } from '@/lib';
import { useAuth } from '@/lib/contexts/auth.context';

/**
 * Phone Authentication Flow Component
 *
 * Follows SOLID principles:
 * - Single Responsibility: Handles phone auth logic only
 * - Dependency Inversion: Uses injected service
 *
 * Follows YAGNI: Only implements what's needed for phone auth
 */

interface PhoneAuthFlowProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function PhoneAuthFlow({ onSuccess, onError }: PhoneAuthFlowProps) {
  const router = useRouter();
  const { checkAuth } = useAuth();

  // Phone validation (E.164 format)
  const validatePhone = (phone: string): string | null => {
    if (!phone) {
      return 'Phone number is required';
    }

    // Remove spaces and dashes for validation
    const cleanPhone = phone.replace(/[\s-]/g, '');

    // Check E.164 format: +[country code][number]
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return 'Please enter a valid phone number with country code (e.g., +919876543210)';
    }

    return null;
  };

  // Request OTP handler
  const handleRequestOtp = async (phone: string) => {
    try {
      // Clean phone number
      const cleanPhone = phone.replace(/[\s-]/g, '');
      await phoneAuthService.requestPhoneOtp(cleanPhone);
      toastService.success('OTP sent to your phone!');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to send OTP';
      toastService.error(errorMessage);
      const err = new Error(errorMessage);
      onError?.(err);
      throw err;
    }
  };

  // Verify OTP handler
  const handleVerifyOtp = async (phone: string, otp: string) => {
    try {
      // Clean phone number
      const cleanPhone = phone.replace(/[\s-]/g, '');
      await phoneAuthService.verifyPhoneOtp({ phone: cleanPhone, otp });

      // Update auth context with user data before calling onSuccess
      await checkAuth();

      toastService.success('Login successful! Welcome back.');

      // Success - let onSuccess callback handle navigation (e.g., to onboarding or home)
      await onSuccess?.();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Invalid OTP';
      toastService.error(errorMessage);
      const err = new Error(errorMessage);
      onError?.(err);
      throw err;
    }
  };

  return (
    <OtpAuthForm
      title="Sign in with Phone"
      inputLabel="Phone Number"
      inputPlaceholder="+919876543210"
      inputType="tel"
      validateInput={validatePhone}
      onRequestOtp={handleRequestOtp}
      onVerifyOtp={handleVerifyOtp}
    />
  );
}
