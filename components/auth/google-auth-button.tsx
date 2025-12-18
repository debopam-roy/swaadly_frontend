'use client';

import { useEffect, useRef } from 'react';
import { env } from '@/lib/config/env';

interface GoogleAuthButtonProps {
  onSuccess: (credential: string) => void;
  onError?: (error: Error) => void;
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  size?: 'large' | 'medium' | 'small';
  width?: number;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              type?: 'standard' | 'icon';
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
              logo_alignment?: 'left' | 'center';
              width?: number;
            }
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export function GoogleAuthButton({
  onSuccess,
  onError,
  text = 'signin_with',
  shape = 'rectangular',
  size = 'large',
  width,
}: GoogleAuthButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGoogleScript = () => {
      if (document.getElementById('google-gsi-script')) {
        initializeGoogle();
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-gsi-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      script.onerror = () => {
        onError?.(new Error('Failed to load Google Sign-In script'));
      };
      document.body.appendChild(script);
    };

    const initializeGoogle = () => {
      if (!window.google || !buttonRef.current) return;

      const clientId = env.GOOGLE_CLIENT_ID;

      if (!clientId) {
        const error = new Error('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured');
        console.error(error);
        onError?.(error);
        return;
      }

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          auto_select: false,
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          type: 'standard',
          theme: 'outline',
          size,
          text,
          shape,
          logo_alignment: 'left',
          width,
        });
      } catch (error) {
        onError?.(
          error instanceof Error ? error : new Error('Failed to initialize Google Sign-In')
        );
      }
    };

    const handleCredentialResponse = (response: { credential: string }) => {
      onSuccess(response.credential);
    };

    loadGoogleScript();

    return () => {
      const script = document.getElementById('google-gsi-script');
      if (script && !document.querySelector('[data-google-button]')) {
        script.remove();
      }
    };
  }, [onSuccess, onError, text, shape, size, width]);

  return <div ref={buttonRef} data-google-button />;
}
