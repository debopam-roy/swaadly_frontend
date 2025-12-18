'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EmailAuthFlow } from '@/components/auth/email-auth-flow';
import { PhoneAuthFlow } from '@/components/auth/phone-auth-flow';
import { GoogleAuthFlow } from '@/components/auth/google-auth-flow';
import { userService } from '@/lib/services/user.service';

export default function LoginPage() {
  const router = useRouter();
  const [usePhone, setUsePhone] = useState(false);

  const handleSuccess = async () => {
    try {
      const data = await userService.getCurrentUser();

      if (!data.profile.onboardingCompleted) {
        router.push('/onboarding');
        return;
      }

      router.push('/');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      router.push('/');
    }
  };

  const handleError = (error: Error) => {
    console.error('Authentication error:', error);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to Swaadly
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue
          </p>
        </div>

        {/* Auth Card */}
        <div className="rounded-lg bg-white p-6 shadow space-y-4">
          {/* Email / Phone */}
          {usePhone ? (
            <PhoneAuthFlow onSuccess={handleSuccess} onError={handleError} />
          ) : (
            <EmailAuthFlow onSuccess={handleSuccess} onError={handleError} />
          )}

          {/* Switch Button */}
          <button
            onClick={() => setUsePhone((prev) => !prev)}
            className="w-full text-sm text-blue-600 hover:text-blue-700"
          >
            {usePhone
              ? 'Use email instead'
              : 'Use phone number instead'}
          </button>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">OR</span>
            </div>
          </div>

          {/* Google (always visible) */}
          <GoogleAuthFlow
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
