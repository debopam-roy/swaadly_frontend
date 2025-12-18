/**
 * Auth Service - Optional Facade
 *
 * This is a convenience facade that aggregates all auth methods.
 * You can use this OR use individual services directly.
 *
 * RECOMMENDED: Import individual services for better separation:
 * - emailPhoneAuthService for email+phone auth
 * - phoneAuthService for phone-only auth
 * - googleAuthService for Google+phone auth
 * - tokenService for token operations
 */

import { emailPhoneAuthService } from './email-phone-auth.service';
import { phoneAuthService } from './phone-auth.service';
import { googleAuthService } from './google-auth.service';
import { tokenService } from './token.service';

class AuthService {
  // Email + Phone Auth (delegates to emailPhoneAuthService)
  emailPhone = emailPhoneAuthService;

  // Phone-Only Auth (delegates to phoneAuthService)
  phone = phoneAuthService;

  // Google + Phone Auth (delegates to googleAuthService)
  google = googleAuthService;

  // Token operations (delegates to tokenService)
  tokens = tokenService;

  // Convenience methods (delegates to tokenService)
  getCurrentUser = () => tokenService.getCurrentUser();
  isAuthenticated = () => tokenService.isAuthenticated();
  logout = () => tokenService.logout();
  refreshToken = () => tokenService.refreshAccessToken();
}

/**
 * Usage:
 *
 * Option 1 - Use individual services (RECOMMENDED):
 * import { googleAuthService } from '@/lib/services/google-auth.service';
 * await googleAuthService.verifyGoogleToken(token);
 *
 * Option 2 - Use facade:
 * import { authService } from '@/lib/services/auth.service';
 * await authService.google.verifyGoogleToken(token);
 *
 * Option 3 - Use shared token service:
 * import { tokenService } from '@/lib/services/token.service';
 * await tokenService.logout();
 */
export const authService = new AuthService();
