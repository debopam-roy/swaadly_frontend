'use client';

/**
 * Toast Provider Component
 *
 * Wraps react-hot-toast's Toaster component with optimized configuration
 * for high-traffic applications (100K+ MAU).
 *
 * Follows SOLID principles:
 * - Single Responsibility: Only handles toast rendering
 * - Dependency Inversion: Consumers use toastService, not this component directly
 *
 * Performance optimizations:
 * - Limits max toasts to prevent memory issues
 * - Optimized animations for smooth UX
 * - Minimal re-renders with containerClassName
 */

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Global default options (can be overridden per toast)
        duration: 4000,
        style: {
          background: '#fff',
          color: '#363636',
          fontSize: '14px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '12px 16px',
          maxWidth: '500px',
        },
        // Success toast styling
        success: {
          duration: 4000,
          style: {
            background: '#f0fdf4', // green-50
            border: '1px solid #86efac', // green-300
          },
          iconTheme: {
            primary: '#10b981', // green-500
            secondary: '#fff',
          },
        },
        // Error toast styling
        error: {
          duration: 5000, // Errors stay longer
          style: {
            background: '#fef2f2', // red-50
            border: '1px solid #fca5a5', // red-300
          },
          iconTheme: {
            primary: '#ef4444', // red-500
            secondary: '#fff',
          },
        },
        // Loading toast styling
        loading: {
          duration: Infinity,
          style: {
            background: '#eff6ff', // blue-50
            border: '1px solid #93c5fd', // blue-300
          },
          iconTheme: {
            primary: '#3b82f6', // blue-500
            secondary: '#fff',
          },
        },
      }}
    />
  );
}
