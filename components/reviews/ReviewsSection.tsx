'use client';

import { useEffect, useState } from 'react';
import { reviewsService } from '@/lib/services/reviews.service';
import type { Review } from '@/lib/types/review.types';
import ReviewCard from './ReviewCard';

const REVIEWS_PER_PAGE = 3;

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewsService.getReviews({
          limit: REVIEWS_PER_PAGE,
          page: 1,
          sortBy: 'createdAt',
          sortOrder: 'desc',
        });
        setReviews(response.reviews);
        setHasMore(response.page < response.totalPages);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const loadMore = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const response = await reviewsService.getReviews({
        limit: REVIEWS_PER_PAGE,
        page: nextPage,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });
      setReviews((prev) => [...prev, ...response.reviews]);
      setPage(nextPage);
      setHasMore(nextPage < response.totalPages);
    } catch (error) {
      console.error('Failed to load more reviews:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoading) {
    return (
      <section className="bg-[#F5E6D3] px-4 md:px-[60px] py-12 md:py-[90px]">
        <div className="flex items-center justify-center">
          <h2 className="font-shrikhand italic text-[#FF7E29] text-5xl md:text-[100px] leading-tight md:leading-[104px] text-center">
            Your love
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-10 md:mt-[60px]">
          {Array.from({ length: REVIEWS_PER_PAGE }).map((_, index) => (
            <div
              key={index}
              className="bg-white/50 animate-pulse rounded-2xl w-full max-w-[424px] h-[400px] md:h-[480px]"
            />
          ))}
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F5E6D3] px-4 md:px-[60px] py-12 md:py-[90px]">
      {/* Section Title */}
      <div className="flex items-center justify-center">
        <h2 className="font-shrikhand italic text-[#FF7E29] text-5xl md:text-[100px] leading-tight md:leading-[104px] text-center">
          Your love
        </h2>
      </div>

      {/* Reviews Grid */}
      <div className="flex flex-wrap gap-6 items-stretch justify-center mt-10 md:mt-[60px]">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Show More Button */}
      {hasMore && (
        <div className="flex justify-center mt-10 md:mt-[60px]">
          <button
            onClick={loadMore}
            disabled={isLoadingMore}
            className="bg-[#FF7E29] hover:bg-[#e86f1f] text-white font-medium text-lg md:text-xl px-8 py-3 md:py-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoadingMore ? 'Loading...' : 'Show More'}
          </button>
        </div>
      )}
    </section>
  );
}
