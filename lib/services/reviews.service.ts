import { httpClient } from '../api/http-client';
import type { Review, ReviewsResponse, ReviewQueryParams } from '../types/review.types';

class ReviewsService {
  private readonly basePath = '/reviews';

  /**
   * Get all reviews with optional filters and pagination
   */
  async getReviews(params?: ReviewQueryParams): Promise<ReviewsResponse> {
    const queryString = params ? this.buildQueryString(params) : '';
    const endpoint = `${this.basePath}${queryString}`;

    return httpClient.get<ReviewsResponse>(endpoint);
  }

  /**
   * Get a single review by ID
   */
  async getReviewById(id: string): Promise<Review> {
    return httpClient.get<Review>(`${this.basePath}/${id}`);
  }

  /**
   * Build query string from params object
   */
  private buildQueryString(params: ReviewQueryParams): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  }
}

export const reviewsService = new ReviewsService();
