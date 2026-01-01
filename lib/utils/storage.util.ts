const STORAGE_KEYS = {
  ACCESS_TOKEN: 'swaadly_access_token',
  REFRESH_TOKEN: 'swaadly_refresh_token',
  USER: 'swaadly_user',
} as const;

class SecureStorage {
  private isAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Set a cookie with the given name and value
   * Used for server-side middleware access
   */
  private setCookie(name: string, value: string, days = 30): void {
    if (typeof document === 'undefined') return; // Skip on server
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }

  /**
   * Delete a cookie with the given name
   */
  private deleteCookie(name: string): void {
    if (typeof document === 'undefined') return; // Skip on server
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }

  setAccessToken(token: string): void {
    if (!this.isAvailable()) return;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    this.setCookie(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  getAccessToken(): string | null {
    if (!this.isAvailable()) return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  setRefreshToken(token: string): void {
    if (!this.isAvailable()) return;
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    this.setCookie(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  getRefreshToken(): string | null {
    if (!this.isAvailable()) return null;
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  setUser(user: object): void {
    if (!this.isAvailable()) return;
    const userJson = JSON.stringify(user);
    localStorage.setItem(STORAGE_KEYS.USER, userJson);
    // Store in cookie for middleware access
    this.setCookie(STORAGE_KEYS.USER, userJson);
  }

  getUser<T>(): T | null {
    if (!this.isAvailable()) return null;
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  }

  clearAuth(): void {
    if (!this.isAvailable()) return;
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);

    // Also clear cookies
    this.deleteCookie(STORAGE_KEYS.ACCESS_TOKEN);
    this.deleteCookie(STORAGE_KEYS.REFRESH_TOKEN);
    this.deleteCookie(STORAGE_KEYS.USER);
  }

  clearAll(): void {
    if (!this.isAvailable()) return;
    localStorage.clear();

    // Clear all auth cookies
    this.deleteCookie(STORAGE_KEYS.ACCESS_TOKEN);
    this.deleteCookie(STORAGE_KEYS.REFRESH_TOKEN);
    this.deleteCookie(STORAGE_KEYS.USER);
  }
}

export const storage = new SecureStorage();
