import { httpClient } from '../api/http-client';

/**
 * Verification Service
 *
 * Handles standalone email and phone verification for logged-in users.
 * These endpoints require JWT authentication but DO NOT issue new tokens.
 * They are used when a user needs to verify additional contact methods.
 *
 * Usage:
 * - User is already authenticated (has JWT)
 * - User wants to add/verify email or phone
 * - Triggers these endpoints from the frontend
 */
class VerificationService {
  /**
   * Request Email Verification OTP
   * Requires JWT authentication
   * @param email - Email address to verify
   * @returns Response with OTP sent confirmation
   */
  async requestEmailVerification(email: string): Promise<{ message: string }> {
    const response = await httpClient.post<{ message: string }>(
      '/verification/email/request-otp',
      { email }
    );
    return response;
  }

  /**
   * Verify Email with OTP
   * Requires JWT authentication
   * @param email - Email address
   * @param otp - OTP received via email
   * @returns Response with verification status
   */
  async verifyEmail(email: string, otp: string): Promise<{
    message: string;
    emailVerified: boolean;
  }> {
    const response = await httpClient.post<{
      message: string;
      emailVerified: boolean;
    }>('/verification/email/verify', { email, otp });
    return response;
  }

  /**
   * Request Phone Verification OTP
   * Requires JWT authentication
   * @param phone - Phone number to verify (E.164 format)
   * @returns Response with OTP sent confirmation
   */
  async requestPhoneVerification(phone: string): Promise<{ message: string }> {
    const response = await httpClient.post<{ message: string }>(
      '/verification/phone/request-otp',
      { phone }
    );
    return response;
  }

  /**
   * Verify Phone with OTP
   * Requires JWT authentication
   * @param phone - Phone number
   * @param otp - OTP received via SMS
   * @returns Response with verification status
   */
  async verifyPhone(phone: string, otp: string): Promise<{
    message: string;
    phoneVerified: boolean;
  }> {
    const response = await httpClient.post<{
      message: string;
      phoneVerified: boolean;
    }>('/verification/phone/verify', { phone, otp });
    return response;
  }
}

export const verificationService = new VerificationService();
