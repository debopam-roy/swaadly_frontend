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

  setAccessToken(token: string): void {
    if (!this.isAvailable()) return;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  getAccessToken(): string | null {
    if (!this.isAvailable()) return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  setRefreshToken(token: string): void {
    if (!this.isAvailable()) return;
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  getRefreshToken(): string | null {
    if (!this.isAvailable()) return null;
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  setUser(user: object): void {
    if (!this.isAvailable()) return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
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
  }

  clearAll(): void {
    if (!this.isAvailable()) return;
    localStorage.clear();
  }
}

export const storage = new SecureStorage();
