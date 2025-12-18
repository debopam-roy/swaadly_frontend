export const env = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1',
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
} as const;
