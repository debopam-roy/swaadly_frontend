'use client';

import { useState } from 'react';
import { GoogleAuthButton } from './google-auth-button';
import { googleAuthService } from '@/lib/services/google-auth.service';
import { useAuth } from '@/lib/contexts/auth.context';

interface GoogleAuthFlowProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function GoogleAuthFlow({ onSuccess, onError }: GoogleAuthFlowProps) {
  const { checkAuth } = useAuth();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSuccess = async (credential: string) => {
    setIsLoading(true);
    setError('');

    try {
      await googleAuthService.verifyGoogleToken(credential);
      await checkAuth();
      onSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Google authentication failed';
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <GoogleAuthButton
        onSuccess={handleGoogleSuccess}
        onError={(err) => {
          setError(err.message);
          onError?.(err);
        }}
        text="continue_with"
        size="large"
        width={384}
      />
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}
      {isLoading && (
        <div className="text-center text-sm text-gray-600">
          Verifying your Google account...
        </div>
      )}
    </div>
  );
}
