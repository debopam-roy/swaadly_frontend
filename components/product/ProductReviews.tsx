'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import StarRating from './StarRating';
import { reviewsService } from '@/lib/services/reviews.service';
import type { Review } from '@/lib/types/review.types';

const REVIEWS_PER_PAGE = 3;

interface ProductReviewsProps {
  productId: string;
  variantId?: string;
}

export default function ProductReviews({ productId, variantId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalReviews, setTotalReviews] = useState(0);

  const fetchReviews = useCallback(async (pageNum: number, append: boolean = false) => {
    try {
      if (!append) {
        setIsLoading(true);
      }
      const response = await reviewsService.getReviews({
        productId,
        variantId,
        limit: REVIEWS_PER_PAGE,
        page: pageNum,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });

      if (append) {
        setReviews((prev) => [...prev, ...response.reviews]);
      } else {
        setReviews(response.reviews);
      }
      setTotalReviews(response.total);
      setHasMore(pageNum < response.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [productId, variantId]);

  // Fetch reviews when productId or variantId changes
  useEffect(() => {
    if (productId) {
      setPage(1);
      fetchReviews(1, false);
    }
  }, [productId, variantId, fetchReviews]);

  const loadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    fetchReviews(page + 1, true);
  };

  if (isLoading) {
    return (
      <section className="w-full bg-[#333333] py-12 md:py-16 px-4 md:px-[60px]">
        <h2 className="text-3xl md:text-[40px] font-bold text-white leading-tight md:leading-[44px] mb-8 md:mb-10">
          Reviews
        </h2>
        <div className="flex flex-col gap-7">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-600 rounded-full" />
                  <div className="h-6 w-32 bg-gray-600 rounded" />
                </div>
                <div className="h-6 w-40 bg-gray-600 rounded" />
                <div className="h-6 w-48 bg-gray-600 rounded" />
                <div className="h-20 w-full bg-gray-600 rounded" />
              </div>
              {index < 1 && <div className="border-t border-gray-600 mt-7" />}
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#333333] py-12 md:py-16 px-4 md:px-[60px]">
      <h2 className="text-3xl md:text-[40px] font-bold text-white leading-tight md:leading-[44px] mb-8 md:mb-10">
        Reviews
      </h2>

      <div className="flex flex-col gap-7">
        {reviews.map((review, index) => (
          <div key={review.id}>
            <div className="flex flex-col gap-5">
              {/* User Info */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 relative">
                  <Image
                    src="/images/profile.svg"
                    alt="User"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl md:text-2xl font-bold text-white leading-7">
                  {review.reviewerName}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <StarRating rating={review.rating} showNumber={false} size="sm" />
                <span className="text-xl md:text-2xl font-medium text-white leading-7">
                  {review.rating.toFixed(1)}
                </span>
              </div>

              {/* Review Title */}
              {review.title && (
                <h3 className="text-xl md:text-2xl font-medium text-white leading-7">
                  {review.title}
                </h3>
              )}

              {/* Review Comment */}
              <p className="text-xl md:text-2xl font-medium text-white leading-7">
                {review.comment}
              </p>
            </div>

            {/* Divider */}
            {index < reviews.length - 1 && (
              <div className="border-t border-gray-500 mt-7" />
            )}
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-10 md:mt-12 text-center">
          <button
            onClick={loadMore}
            disabled={isLoadingMore}
            className="px-8 py-3 border-2 border-white text-white font-medium rounded-full transition-colors cursor-pointer hover:bg-white hover:disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingMore ? 'Loading...' : 'Load More Reviews'}
          </button>
        </div>
      )}

      {/* Total Reviews Info */}
      {totalReviews > 0 && (
        <p className="text-gray-400 text-center mt-4">
          Showing {reviews.length} of {totalReviews} reviews
        </p>
      )}
    </section>
  );
}
