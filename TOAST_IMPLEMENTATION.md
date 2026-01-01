# Toast Notification Implementation Guide

## Overview
This document describes the implementation of toast notifications in the Swaadly frontend application using `react-hot-toast`. The implementation follows SOLID, DRY, and YAGNI principles and is optimized for high-traffic applications (100K+ MAU).

## Architecture

### Core Components

#### 1. Toast Service (`lib/utils/toast.util.ts`)
A centralized singleton service that provides a clean API for showing notifications throughout the app.

**Key Features:**
- Type-safe methods for different notification types (success, error, loading, info, warning)
- Promise-based notifications for async operations
- Configurable duration and positioning
- Automatic cleanup to prevent memory leaks
- Optimized for performance with minimal overhead

**Available Methods:**
```typescript
// Success notification
toastService.success('Login successful!');

// Error notification
toastService.error('Failed to save changes');

// Loading notification (returns ID for manual dismissal)
const loadingId = toastService.loading('Uploading...');
toastService.dismiss(loadingId);

// Info notification
toastService.info('New features available');

// Warning notification
toastService.warning('Session expiring soon');

// Promise-based (automatic loading/success/error)
toastService.promise(
  apiCall(),
  {
    loading: 'Saving...',
    success: 'Saved successfully!',
    error: 'Failed to save'
  }
);

// Custom notification with options
toastService.success('Item added', {
  duration: 2000,
  position: 'bottom-center'
});

// Remove all toasts
toastService.removeAll();
```

#### 2. Toast Provider (`components/toast-provider.tsx`)
A React component that wraps `react-hot-toast`'s Toaster with optimized configuration.

**Features:**
- Consistent styling across all toasts
- Optimized animations for smooth UX
- Color-coded toast types (success=green, error=red, loading=blue)
- Positioned at top-right by default (non-intrusive)
- Automatic stacking with 8px gutter

#### 3. Integration Points
Toast notifications have been integrated into the following key areas:

**Authentication:**
- Email login (OTP sent, login success, errors)
- Phone login (OTP sent, login success, errors)
- Google login (success, errors)
- Logout (success, errors)

**Cart Operations:**
- Add to cart (success with product name)
- Remove from cart (info notification)

## Implementation Details

### 1. Installation
```bash
yarn add react-hot-toast
```

### 2. Setup in Root Layout
The `ToastProvider` is added to `app/layout.tsx` at the root level:

```tsx
import { ToastProvider } from "@/components/toast-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <ToastProvider />  {/* Toast notifications */}
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 3. Usage in Components
Import and use the `toastService` anywhere in your application:

```tsx
import { toastService } from '@/lib';

// In your component
const handleSubmit = async () => {
  try {
    await saveData();
    toastService.success('Data saved successfully!');
  } catch (error) {
    toastService.error('Failed to save data');
  }
};
```

## Best Practices

### 1. Message Guidelines
- **Success**: Use positive, confirming language ("Login successful!", "Item added to cart!")
- **Error**: Be specific about what went wrong ("Invalid email format", "Network error")
- **Loading**: Use present continuous tense ("Saving...", "Uploading...", "Processing...")
- **Info**: Provide helpful context ("Session expires in 5 minutes")
- **Warning**: Alert users to potential issues ("Unsaved changes will be lost")

### 2. Duration Settings
- **Success**: 3-4 seconds (default: 4s)
- **Error**: 5 seconds (stays longer so users can read)
- **Loading**: Infinity (must be manually dismissed)
- **Info/Warning**: 4 seconds (default)

### 3. Performance Considerations
The implementation is optimized for high-traffic:
- Lightweight wrapper with minimal overhead (~5KB gzipped)
- Singleton pattern prevents multiple toast manager instances
- Automatic cleanup on unmount
- No unnecessary re-renders

### 4. When to Use Toast vs Alert/Modal
- **Toast**: Non-blocking feedback for actions (save, delete, add to cart)
- **Alert/Modal**: Blocking confirmations or critical errors requiring user action

### 5. Accessibility
`react-hot-toast` provides:
- ARIA labels for screen readers
- Keyboard navigation support
- Proper role attributes

## Current Implementation Status

### ✅ Implemented Events
1. **Email Authentication**
   - OTP request success/error
   - Login success/error

2. **Phone Authentication**
   - OTP request success/error
   - Login success/error

3. **Google Authentication**
   - Login success/error

4. **Logout**
   - Success/error notifications

5. **Cart Operations**
   - Add to cart (success)
   - Remove from cart (info)

### 📝 Suggested Additional Events
Consider adding toast notifications for:

1. **Profile Updates**
   - Profile saved successfully
   - Avatar upload success/error

2. **Order Operations**
   - Order placed successfully
   - Order cancelled

3. **Form Validations**
   - Form submission errors
   - Required fields missing

4. **Network Issues**
   - Connection lost/restored
   - Offline mode warnings

5. **Newsletter**
   - Subscription success

## Example: Adding Toast to a New Feature

```tsx
// In your component file
import { toastService } from '@/lib';

const MyComponent = () => {
  const handleAction = async () => {
    // Option 1: Manual control
    const loadingId = toastService.loading('Processing...');
    try {
      await performAction();
      toastService.dismiss(loadingId);
      toastService.success('Action completed!');
    } catch (error) {
      toastService.dismiss(loadingId);
      toastService.error('Action failed');
    }

    // Option 2: Promise-based (automatic)
    toastService.promise(
      performAction(),
      {
        loading: 'Processing...',
        success: 'Action completed!',
        error: 'Action failed'
      }
    );
  };

  return <button onClick={handleAction}>Click me</button>;
};
```

## Customization

### Changing Default Position
Edit `lib/utils/toast.util.ts`:
```typescript
const DEFAULT_CONFIG: ToastOptions = {
  position: 'bottom-center', // Change position
  // ... other options
};
```

### Changing Colors
Edit `components/toast-provider.tsx`:
```tsx
success: {
  style: {
    background: '#your-color',
    border: '1px solid #your-border-color',
  },
}
```

### Adding Custom Toast Types
Add to `lib/utils/toast.util.ts`:
```typescript
class ToastService {
  // ... existing methods

  custom(message: string, options?: ToastOptions): string {
    return toast(message, {
      ...DEFAULT_CONFIG,
      icon: '🎉',
      ...options,
    });
  }
}
```

## Testing

The implementation has been tested:
- ✅ TypeScript compilation (no errors)
- ✅ Build process successful
- ✅ No console errors

**Manual Testing Checklist:**
- [ ] Login with email shows success toast
- [ ] Login with phone shows success toast
- [ ] Google login shows success toast
- [ ] Logout shows success toast
- [ ] Add to cart shows success toast
- [ ] Remove from cart shows info toast
- [ ] Invalid OTP shows error toast
- [ ] Network errors show error toast

## Files Modified

1. **New Files:**
   - `lib/utils/toast.util.ts` - Toast service implementation
   - `components/toast-provider.tsx` - Toast provider component

2. **Modified Files:**
   - `app/layout.tsx` - Added ToastProvider
   - `lib/index.ts` - Export toastService
   - `lib/contexts/auth.context.tsx` - Added logout toast
   - `lib/contexts/cart.context.tsx` - Added cart operation toasts
   - `components/auth/email-auth-flow.tsx` - Added login toasts
   - `components/auth/phone-auth-flow.tsx` - Added login toasts
   - `components/auth/google-auth-flow.tsx` - Added login toasts

## Support

For issues or questions about the toast implementation:
1. Check `react-hot-toast` documentation: https://react-hot-toast.com/
2. Review the usage examples in `lib/utils/toast.util.ts`
3. Check console for any error messages

## License
This implementation uses `react-hot-toast` which is MIT licensed.
