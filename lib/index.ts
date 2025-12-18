// Independent Auth Services (RECOMMENDED - Use these directly)
export { emailPhoneAuthService } from './services/email-phone-auth.service';
export { phoneAuthService } from './services/phone-auth.service';
export { googleAuthService } from './services/google-auth.service';
export { tokenService } from './services/token.service';
export { verificationService } from './services/verification.service';

// Optional Facade (use if you prefer)
export { authService } from './services/auth.service';

// Context and Hooks
export { useAuth, AuthProvider } from './contexts/auth.context';
export { useProtectedRoute } from './hooks/use-protected-route';

// Utilities
export { storage } from './utils/storage.util';
export { httpClient } from './api/http-client';

// Common Types
export type {
  User,
  AuthTokens,
  ApiError,
} from './types/auth.types';

// Email+Phone Auth Types
export type {
  EmailOtpRequest,
  VerifyEmailOtpRequest,
  EmailPhoneAuthResponse,
  EmailOtpInitResponse,
} from './types/email-phone-auth.types';

// Phone Auth Types
export type {
  PhoneOtpRequest,
  VerifyPhoneOtpRequest,
  PhoneAuthResponse,
  PhoneOtpInitResponse,
} from './types/phone-auth.types';

// Google Auth Types
export type {
  GoogleAuthRequest,
  GoogleVerifyPhoneRequest,
  GoogleAuthResponse,
  GoogleInitResponse,
  GoogleTokenPayload,
} from './types/google-auth.types';
