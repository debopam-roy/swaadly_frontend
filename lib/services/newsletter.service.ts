import { httpClient } from '../api/http-client';

interface SubscribeResponse {
  message: string;
  subscriber: {
    email: string;
    subscribedAt: string;
  };
}

interface UnsubscribeResponse {
  message: string;
}

interface StatusResponse {
  subscribed: boolean;
  subscribedAt?: string;
  unsubscribedAt?: string;
  message?: string;
}

class NewsletterService {
  /**
   * Subscribe to newsletter - No authentication required
   */
  async subscribe(email: string, source?: string): Promise<SubscribeResponse> {
    return httpClient.post<SubscribeResponse>(
      '/newsletter/subscribe',
      {
        email,
        source: source || 'footer',
      },
      { requiresAuth: false } // Public endpoint - no auth needed
    );
  }

  /**
   * Unsubscribe from newsletter - No authentication required
   */
  async unsubscribe(email: string): Promise<UnsubscribeResponse> {
    return httpClient.delete<UnsubscribeResponse>(
      `/newsletter/unsubscribe?email=${encodeURIComponent(email)}`,
      { requiresAuth: false } // Public endpoint - no auth needed
    );
  }

  /**
   * Get subscription status - No authentication required
   */
  async getStatus(email: string): Promise<StatusResponse> {
    return httpClient.get<StatusResponse>(
      `/newsletter/status?email=${encodeURIComponent(email)}`,
      { requiresAuth: false } // Public endpoint - no auth needed
    );
  }
}

export const newsletterService = new NewsletterService();
