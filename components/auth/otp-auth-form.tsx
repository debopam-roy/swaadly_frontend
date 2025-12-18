'use client';

import { useState } from 'react';

/**
 * Reusable OTP Authentication Form Component
 *
 * Follows SOLID principles:
 * - Single Responsibility: Handles OTP flow UI only
 * - Open/Closed: Extensible via callbacks
 * - Dependency Inversion: Depends on abstractions (callbacks)
 *
 * Follows DRY: Shared by email and phone auth
 */

interface OtpAuthFormProps {
  // Configuration
  title: string;
  inputLabel: string;
  inputPlaceholder: string;
  inputType?: 'email' | 'tel' | 'text';

  // Validation
  validateInput?: (value: string) => string | null; // Returns error message or null

  // Actions
  onRequestOtp: (identifier: string) => Promise<void>;
  onVerifyOtp: (identifier: string, otp: string) => Promise<void>;

  // Optional
  disabled?: boolean;
}

export function OtpAuthForm({
  title,
  inputLabel,
  inputPlaceholder,
  inputType = 'text',
  validateInput,
  onRequestOtp,
  onVerifyOtp,
  disabled = false,
}: OtpAuthFormProps) {
  const [step, setStep] = useState<'input' | 'verify'>('input');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate input
    if (validateInput) {
      const validationError = validateInput(identifier);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setLoading(true);
    try {
      await onRequestOtp(identifier);
      setStep('verify');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      await onVerifyOtp(identifier, otp);
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep('input');
    setOtp('');
    setError(null);
  };

  if (step === 'verify') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter the 6-digit code sent to{' '}
            <span className="font-medium text-gray-900">{identifier}</span>
          </p>
        </div>

        <form onSubmit={handleVerifyOtp} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="000000"
              disabled={loading || disabled}
              autoComplete="one-time-code"
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              disabled={loading || disabled}
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={loading || disabled || otp.length !== 6}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </form>

        <button
          type="button"
          onClick={handleRequestOtp}
          className="w-full text-center text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50"
          disabled={loading || disabled}
        >
          Resend code
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm text-gray-600">
          We'll send you a verification code
        </p>
      </div>

      <form onSubmit={handleRequestOtp} className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
            {inputLabel}
          </label>
          <input
            id="identifier"
            type={inputType}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={inputPlaceholder}
            disabled={loading || disabled}
            autoComplete={inputType === 'email' ? 'email' : 'tel'}
            autoFocus
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={loading || disabled || !identifier}
        >
          {loading ? 'Sending...' : 'Send Code'}
        </button>
      </form>
    </div>
  );
}
