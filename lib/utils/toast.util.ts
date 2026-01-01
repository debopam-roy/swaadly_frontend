/**
 * Toast Notification Utility
 *
 * Centralized toast notification service using react-hot-toast.
 * Follows SOLID principles:
 * - Single Responsibility: Handles all toast notifications
 * - Open/Closed: Extensible for new toast types without modification
 * - Dependency Inversion: Wraps react-hot-toast for easy replacement
 *
 * Follows DRY: Single source of truth for all toast configurations
 * Follows YAGNI: Only implements needed toast types
 *
 * Optimized for high-traffic applications (100K+ MAU):
 * - Lightweight wrapper with minimal overhead
 * - Configurable duration and position
 * - Automatic cleanup to prevent memory leaks
 */

import toast, { type Toast, type ToastOptions } from 'react-hot-toast';

/**
 * Default toast configuration optimized for UX
 */
const DEFAULT_CONFIG: ToastOptions = {
  duration: 4000, // 4 seconds - optimal for reading short messages
  position: 'bottom-right', // Non-intrusive position
  style: {
    fontSize: '14px',
    maxWidth: '500px',
  },
};

/**
 * Toast types with specific styling
 */
const TOAST_STYLES = {
  success: {
    iconTheme: {
      primary: '#10b981', // green-500
      secondary: 'white',
    },
  },
  error: {
    iconTheme: {
      primary: '#ef4444', // red-500
      secondary: 'white',
    },
  },
  loading: {
    iconTheme: {
      primary: '#3b82f6', // blue-500
      secondary: 'white',
    },
  },
  info: {
    icon: 'ℹ️',
    iconTheme: {
      primary: '#3b82f6', // blue-500
      secondary: 'white',
    },
  },
  warning: {
    icon: '⚠️',
    iconTheme: {
      primary: '#f59e0b', // amber-500
      secondary: 'white',
    },
  },
};

/**
 * Toast Service Class
 * Provides a clean API for showing notifications
 */
class ToastService {
  /**
   * Show success toast
   * @param message - Success message to display
   * @param options - Optional toast configuration
   */
  success(message: string, options?: ToastOptions): string {
    return toast.success(message, {
      ...DEFAULT_CONFIG,
      ...TOAST_STYLES.success,
      ...options,
    });
  }

  /**
   * Show error toast
   * @param message - Error message to display
   * @param options - Optional toast configuration
   */
  error(message: string, options?: ToastOptions): string {
    return toast.error(message, {
      ...DEFAULT_CONFIG,
      ...TOAST_STYLES.error,
      duration: 5000, // Errors stay a bit longer
      ...options,
    });
  }

  /**
   * Show loading toast
   * Returns toast ID for manual dismissal
   * @param message - Loading message to display
   * @param options - Optional toast configuration
   */
  loading(message: string, options?: ToastOptions): string {
    return toast.loading(message, {
      ...DEFAULT_CONFIG,
      ...TOAST_STYLES.loading,
      duration: Infinity, // Loading persists until dismissed
      ...options,
    });
  }

  /**
   * Show info toast
   * @param message - Info message to display
   * @param options - Optional toast configuration
   */
  info(message: string, options?: ToastOptions): string {
    return toast(message, {
      ...DEFAULT_CONFIG,
      ...TOAST_STYLES.info,
      ...options,
    });
  }

  /**
   * Show warning toast
   * @param message - Warning message to display
   * @param options - Optional toast configuration
   */
  warning(message: string, options?: ToastOptions): string {
    return toast(message, {
      ...DEFAULT_CONFIG,
      ...TOAST_STYLES.warning,
      ...options,
    });
  }

  /**
   * Dismiss a specific toast by ID
   * @param toastId - Toast ID returned from show methods
   */
  dismiss(toastId?: string): void {
    toast.dismiss(toastId);
  }

  /**
   * Promise-based toast for async operations
   * Automatically shows loading, success, or error based on promise state
   *
   * @param promise - Promise to track
   * @param messages - Messages for each state
   * @param options - Optional toast configuration
   *
   * @example
   * toastService.promise(
   *   apiCall(),
   *   {
   *     loading: 'Saving...',
   *     success: 'Saved successfully!',
   *     error: 'Failed to save'
   *   }
   * );
   */
  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    options?: ToastOptions
  ): Promise<T> {
    return toast.promise(
      promise,
      messages,
      {
        ...DEFAULT_CONFIG,
        loading: { ...TOAST_STYLES.loading },
        success: { ...TOAST_STYLES.success },
        error: { ...TOAST_STYLES.error, duration: 5000 },
        ...options,
      }
    );
  }

  /**
   * Custom toast with full control
   * @param message - Message to display
   * @param options - Toast configuration
   */
  custom(message: string, options?: ToastOptions): string {
    return toast(message, {
      ...DEFAULT_CONFIG,
      ...options,
    });
  }

  /**
   * Remove all toasts
   * Useful for cleanup on navigation or logout
   */
  removeAll(): void {
    toast.remove();
  }
}

/**
 * Singleton instance for consistent usage across the app
 */
export const toastService = new ToastService();

/**
 * Usage Examples:
 *
 * // Success notification
 * toastService.success('Login successful!');
 *
 * // Error notification
 * toastService.error('Failed to save changes');
 *
 * // Loading notification
 * const loadingId = toastService.loading('Uploading...');
 * // Later dismiss it
 * toastService.dismiss(loadingId);
 *
 * // Promise-based (automatic loading/success/error)
 * toastService.promise(
 *   fetch('/api/data'),
 *   {
 *     loading: 'Loading data...',
 *     success: 'Data loaded!',
 *     error: 'Failed to load data'
 *   }
 * );
 *
 * // Custom with options
 * toastService.success('Item added to cart', {
 *   duration: 2000,
 *   position: 'bottom-center'
 * });
 */
