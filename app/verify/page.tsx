'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/contexts/auth.context';
import { verificationService } from '@/lib/services/verification.service';
import { tokenService } from '@/lib/services/token.service';
import { toastService } from '@/lib/utils/toast.util';
import { Mail, Phone, CheckCircle, ArrowLeft, ShieldCheck, Plus } from 'lucide-react';

type VerificationStep = 'select' | 'email-otp' | 'phone-input' | 'phone-otp';

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading, isAuthenticated, checkAuth } = useAuth();

  const redirectTo = searchParams.get('redirect') || '/checkout';

  const [step, setStep] = useState<VerificationStep>('select');
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneToVerify, setPhoneToVerify] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/auth/login?redirect=/verify?redirect=${encodeURIComponent(redirectTo)}`);
    }
  }, [authLoading, isAuthenticated, router, redirectTo]);

  // Check if all verifications are complete
  useEffect(() => {
    if (user?.auth.emailVerified && user?.auth.phoneVerified) {
      toastService.success('All verifications complete!');
      router.push(redirectTo);
    }
  }, [user, router, redirectTo]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const needsEmailVerification = user && !user.auth.emailVerified && user.auth.email;
  const needsPhoneVerification = user && !user.auth.phoneVerified;
  const hasPhone = user?.auth.phone;

  const handleRequestEmailOtp = async () => {
    if (!user?.auth.email) return;

    setIsLoading(true);
    try {
      await verificationService.requestEmailVerification(user.auth.email);
      toastService.success('OTP sent to your email');
      setStep('email-otp');
      setOtp(['', '', '', '', '', '']);
      setCountdown(60);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (error) {
      toastService.error(error instanceof Error ? error.message : 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestPhoneOtp = async (phone?: string) => {
    const phoneToUse = phone || user?.auth.phone;
    if (!phoneToUse) return;

    setIsLoading(true);
    try {
      await verificationService.requestPhoneVerification(phoneToUse);
      toastService.success('OTP sent to your phone');
      setPhoneToVerify(phoneToUse);
      setStep('phone-otp');
      setOtp(['', '', '', '', '', '']);
      setCountdown(60);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (error) {
      toastService.error(error instanceof Error ? error.message : 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPhone = async () => {
    // Validate phone number (Indian format)
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      toastService.error('Please enter a valid 10-digit phone number');
      return;
    }

    const formattedPhone = `+91${cleanPhone}`;
    await handleRequestPhoneOtp(formattedPhone);
  };

  const handleVerifyEmail = async () => {
    if (!user?.auth.email) return;

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toastService.error('Please enter complete OTP');
      return;
    }

    setIsLoading(true);
    try {
      await verificationService.verifyEmail(user.auth.email, otpCode);
      // Refresh token to get updated verification claims
      await tokenService.refreshAccessToken();
      toastService.success('Email verified successfully!');
      await checkAuth(); // Refresh user data
      setStep('select');
      setOtp(['', '', '', '', '', '']);
    } catch (error) {
      toastService.error(error instanceof Error ? error.message : 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPhone = async () => {
    if (!phoneToVerify) return;

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toastService.error('Please enter complete OTP');
      return;
    }

    setIsLoading(true);
    try {
      await verificationService.verifyPhone(phoneToVerify, otpCode);
      // Refresh token to get updated verification claims
      await tokenService.refreshAccessToken();
      toastService.success('Phone verified successfully!');
      await checkAuth(); // Refresh user data
      setStep('select');
      setOtp(['', '', '', '', '', '']);
      setPhoneNumber('');
      setPhoneToVerify('');
    } catch (error) {
      toastService.error(error instanceof Error ? error.message : 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    const nextEmpty = newOtp.findIndex(v => !v);
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  };

  // Loading state
  if (authLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#44C997] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const renderOtpInput = () => (
    <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={el => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleOtpChange(index, e.target.value)}
          onKeyDown={(e) => handleOtpKeyDown(index, e)}
          className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-200 rounded-lg focus:border-[#44C997] focus:outline-none transition-colors"
        />
      ))}
    </div>
  );

  // Calculate what's missing for the info message
  const getInfoMessage = () => {
    const emailNeeded = !user?.auth.emailVerified && user?.auth.email;
    const phoneNeeded = !user?.auth.phoneVerified;

    if (emailNeeded && phoneNeeded) {
      return 'Both email and phone verification are required to place orders.';
    } else if (emailNeeded) {
      return 'Email verification is required to place orders.';
    } else if (phoneNeeded) {
      return hasPhone
        ? 'Phone verification is required to place orders.'
        : 'Please add and verify a phone number to place orders.';
    }
    return 'All verifications are complete!';
  };

  return (
    <main className="min-h-screen pb-20">
      {/* Page Title */}
      <section className="pt-8 md:pt-12 pb-6 md:pb-10">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <h1
            className="text-3xl md:text-4xl font-display text-white italic text-center"
            style={{
              WebkitTextStroke: '2px var(--peanut)',
              paintOrder: 'stroke fill',
              fontWeight: 700,
              textShadow: '0px 4px 0px #C68642',
            } as React.CSSProperties}
          >
            Verify Your Account
          </h1>
        </div>
      </section>

      {/* Verification Content */}
      <section>
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#44C997]/10 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#44C997]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Account Verification Required
                  </h2>
                  <p className="text-sm text-gray-500">
                    Please verify your contact details to continue
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === 'select' && (
                <div className="space-y-4">
                  {/* Email Verification */}
                  {user?.auth.email && (
                    <div
                      className={`p-4 border rounded-xl transition-colors ${
                        user.auth.emailVerified
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 hover:border-[#44C997]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            user.auth.emailVerified ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            <Mail className={`w-5 h-5 ${
                              user.auth.emailVerified ? 'text-green-600' : 'text-gray-500'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Email</p>
                            <p className="text-sm text-gray-500">{user.auth.email}</p>
                          </div>
                        </div>
                        {user.auth.emailVerified ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">Verified</span>
                          </div>
                        ) : (
                          <button
                            onClick={handleRequestEmailOtp}
                            disabled={isLoading}
                            className="px-4 py-2 bg-[#44C997] text-white text-sm font-medium rounded-lg hover:bg-[#3AB586] transition-colors disabled:opacity-50"
                          >
                            {isLoading ? 'Sending...' : 'Verify'}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Phone Verification - Has Phone */}
                  {hasPhone && (
                    <div
                      className={`p-4 border rounded-xl transition-colors ${
                        user?.auth.phoneVerified
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 hover:border-[#44C997]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            user?.auth.phoneVerified ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            <Phone className={`w-5 h-5 ${
                              user?.auth.phoneVerified ? 'text-green-600' : 'text-gray-500'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Phone</p>
                            <p className="text-sm text-gray-500">{user?.auth.phone}</p>
                          </div>
                        </div>
                        {user?.auth.phoneVerified ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">Verified</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleRequestPhoneOtp()}
                            disabled={isLoading}
                            className="px-4 py-2 bg-[#44C997] text-white text-sm font-medium rounded-lg hover:bg-[#3AB586] transition-colors disabled:opacity-50"
                          >
                            {isLoading ? 'Sending...' : 'Verify'}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Phone Verification - No Phone (Add Phone) */}
                  {!hasPhone && (
                    <div className="p-4 border border-amber-200 bg-amber-50 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-100">
                            <Phone className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Phone</p>
                            <p className="text-sm text-amber-700">Not added yet</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setStep('phone-input')}
                          className="px-4 py-2 bg-[#44C997] text-white text-sm font-medium rounded-lg hover:bg-[#3AB586] transition-colors flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" />
                          Add Phone
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Info message */}
                  <div className={`mt-6 p-4 rounded-lg ${
                    user?.auth.emailVerified && user?.auth.phoneVerified
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-amber-50 border border-amber-200'
                  }`}>
                    <p className={`text-sm ${
                      user?.auth.emailVerified && user?.auth.phoneVerified
                        ? 'text-green-800'
                        : 'text-amber-800'
                    }`}>
                      {getInfoMessage()}
                    </p>
                  </div>
                </div>
              )}

              {/* Add Phone Step */}
              {step === 'phone-input' && (
                <div className="space-y-6">
                  <button
                    onClick={() => setStep('select')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Back</span>
                  </button>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#44C997]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-[#44C997]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Add Phone Number</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Enter your phone number to receive OTP
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex items-center px-3 bg-gray-100 border border-gray-200 rounded-lg">
                      <span className="text-gray-600 font-medium">+91</span>
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter 10-digit number"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:border-[#44C997] focus:outline-none transition-colors"
                      maxLength={10}
                    />
                  </div>

                  <button
                    onClick={handleAddPhone}
                    disabled={isLoading || phoneNumber.length !== 10}
                    className="w-full py-3 bg-[#44C997] text-white font-medium rounded-xl hover:bg-[#3AB586] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      'Send OTP'
                    )}
                  </button>
                </div>
              )}

              {/* Email OTP Step */}
              {step === 'email-otp' && (
                <div className="space-y-6">
                  <button
                    onClick={() => setStep('select')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Back</span>
                  </button>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#44C997]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-[#44C997]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Verify Email</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Enter the 6-digit code sent to
                    </p>
                    <p className="text-sm font-medium text-gray-700">{user?.auth.email}</p>
                  </div>

                  {renderOtpInput()}

                  <button
                    onClick={handleVerifyEmail}
                    disabled={isLoading || otp.join('').length !== 6}
                    className="w-full py-3 bg-[#44C997] text-white font-medium rounded-xl hover:bg-[#3AB586] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Email'
                    )}
                  </button>

                  <div className="text-center">
                    {countdown > 0 ? (
                      <p className="text-sm text-gray-500">
                        Resend code in {countdown}s
                      </p>
                    ) : (
                      <button
                        onClick={handleRequestEmailOtp}
                        disabled={isLoading}
                        className="text-sm text-[#44C997] hover:underline disabled:opacity-50"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Phone OTP Step */}
              {step === 'phone-otp' && (
                <div className="space-y-6">
                  <button
                    onClick={() => setStep('select')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Back</span>
                  </button>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#44C997]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-[#44C997]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Verify Phone</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Enter the 6-digit code sent to
                    </p>
                    <p className="text-sm font-medium text-gray-700">{phoneToVerify}</p>
                  </div>

                  {renderOtpInput()}

                  <button
                    onClick={handleVerifyPhone}
                    disabled={isLoading || otp.join('').length !== 6}
                    className="w-full py-3 bg-[#44C997] text-white font-medium rounded-xl hover:bg-[#3AB586] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Phone'
                    )}
                  </button>

                  <div className="text-center">
                    {countdown > 0 ? (
                      <p className="text-sm text-gray-500">
                        Resend code in {countdown}s
                      </p>
                    ) : (
                      <button
                        onClick={() => handleRequestPhoneOtp(phoneToVerify)}
                        disabled={isLoading}
                        className="text-sm text-[#44C997] hover:underline disabled:opacity-50"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button
                onClick={() => router.push(redirectTo)}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
