/**
 * Toast Notification Examples
 *
 * This file contains practical examples of how to use the toast service
 * throughout your application. Copy these patterns into your components.
 */

import { toastService } from './toast.util';

/**
 * Example 1: Simple Success Notification
 * Use for confirming successful actions
 */
export const exampleSimpleSuccess = () => {
  toastService.success('Profile updated successfully!');
};

/**
 * Example 2: Simple Error Notification
 * Use for displaying error messages
 */
export const exampleSimpleError = () => {
  toastService.error('Failed to update profile. Please try again.');
};

/**
 * Example 3: Loading with Manual Dismissal
 * Use when you need to control when the loading toast disappears
 */
export const exampleLoadingManual = async () => {
  const loadingId = toastService.loading('Uploading image...');

  try {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Dismiss loading and show success
    toastService.dismiss(loadingId);
    toastService.success('Image uploaded successfully!');
  } catch (error) {
    // Dismiss loading and show error
    toastService.dismiss(loadingId);
    toastService.error('Failed to upload image');
  }
};

/**
 * Example 4: Promise-based Toast
 * Use for async operations - automatically handles loading/success/error
 * This is the RECOMMENDED approach for most async operations
 */
export const examplePromiseBased = async () => {
  const uploadImage = async () => {
    // Your async operation here
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { url: 'https://example.com/image.jpg' };
  };

  toastService.promise(
    uploadImage(),
    {
      loading: 'Uploading image...',
      success: 'Image uploaded successfully!',
      error: 'Failed to upload image'
    }
  );
};

/**
 * Example 5: Info Notification
 * Use for informational messages that aren't success/error
 */
export const exampleInfo = () => {
  toastService.info('Your session will expire in 5 minutes');
};

/**
 * Example 6: Warning Notification
 * Use for warnings and cautions
 */
export const exampleWarning = () => {
  toastService.warning('You have unsaved changes');
};

/**
 * Example 7: Custom Duration
 * Use when you need the toast to stay longer/shorter
 */
export const exampleCustomDuration = () => {
  // Short notification (2 seconds)
  toastService.success('Item added to cart!', { duration: 2000 });

  // Long notification (7 seconds)
  toastService.error('Critical error occurred. Please contact support.', { duration: 7000 });
};

/**
 * Example 8: Custom Position
 * Use when you need toast in a different position
 */
export const exampleCustomPosition = () => {
  toastService.success('Payment successful!', {
    position: 'bottom-center',
    duration: 5000
  });
};

/**
 * Example 9: Form Submission with Validation
 * Real-world example for form handling
 */
export const exampleFormSubmission = async (formData: any) => {
  // Validate
  if (!formData.email) {
    toastService.error('Email is required');
    return;
  }

  if (!formData.password) {
    toastService.error('Password is required');
    return;
  }

  // Submit with promise-based toast
  try {
    await toastService.promise(
      submitForm(formData),
      {
        loading: 'Submitting form...',
        success: 'Form submitted successfully!',
        error: 'Failed to submit form'
      }
    );
  } catch (error) {
    // Error already shown by promise toast
    console.error('Form submission failed:', error);
  }
};

/**
 * Example 10: Multiple Sequential Toasts
 * Use when you need to show multiple notifications in sequence
 */
export const exampleSequentialToasts = async () => {
  toastService.info('Starting process...');

  await new Promise(resolve => setTimeout(resolve, 1000));
  toastService.info('Step 1 complete');

  await new Promise(resolve => setTimeout(resolve, 1000));
  toastService.info('Step 2 complete');

  await new Promise(resolve => setTimeout(resolve, 1000));
  toastService.success('All steps completed!');
};

/**
 * Example 11: Cleanup on Navigation
 * Use when you want to clear all toasts when navigating away
 */
export const exampleCleanupOnNavigation = () => {
  // In your navigation handler or useEffect cleanup
  toastService.removeAll();
};

/**
 * Example 12: API Error Handling
 * Real-world example for handling API errors
 */
export const exampleAPIErrorHandling = async (apiCall: () => Promise<any>) => {
  try {
    const response = await apiCall();
    toastService.success('Operation completed successfully!');
    return response;
  } catch (error: any) {
    // Handle different error types
    if (error.response?.status === 401) {
      toastService.error('Session expired. Please login again.');
    } else if (error.response?.status === 403) {
      toastService.error('You do not have permission to perform this action.');
    } else if (error.response?.status === 404) {
      toastService.error('Resource not found.');
    } else if (error.response?.status >= 500) {
      toastService.error('Server error. Please try again later.');
    } else if (error.message === 'Network Error') {
      toastService.error('Network error. Please check your connection.');
    } else {
      toastService.error(error.response?.data?.message || 'An error occurred');
    }
    throw error;
  }
};

/**
 * Example 13: Optimistic Updates
 * Use when you want to show success immediately and rollback on error
 */
export const exampleOptimisticUpdate = async (item: any, updateFn: () => Promise<void>) => {
  // Show success immediately
  toastService.success('Item updated!', { duration: 2000 });

  try {
    await updateFn();
  } catch (error) {
    // Rollback and show error
    toastService.error('Failed to update item. Changes reverted.');
  }
};

/**
 * Example 14: Rate Limiting Notification
 * Use to prevent toast spam
 */
let lastToastTime = 0;
const TOAST_COOLDOWN = 1000; // 1 second

export const exampleRateLimited = (message: string) => {
  const now = Date.now();
  if (now - lastToastTime > TOAST_COOLDOWN) {
    toastService.info(message);
    lastToastTime = now;
  }
};

/**
 * Example 15: Copying to Clipboard
 * Common use case with toast feedback
 */
export const exampleCopyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toastService.success('Copied to clipboard!', { duration: 2000 });
  } catch (error) {
    toastService.error('Failed to copy to clipboard');
  }
};

// Mock function for examples
const submitForm = async (formData: any) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true };
};
