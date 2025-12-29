export interface Review {
  id: string;
  reviewerName: string;
  reviewerEmail?: string;
  reviewerAvatarUrl?: string;
  rating: number;
  title?: string;
  comment: string;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  helpfulCount: number;
  unhelpfulCount: number;
  productId: string;
  variantId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewsResponse {
  reviews: Review[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ReviewQueryParams {
  productId?: string;
  variantId?: string;
  rating?: number;
  isApproved?: boolean;
  sortBy?: 'createdAt' | 'rating' | 'helpfulCount';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
