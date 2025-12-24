'use client';

import Image from 'next/image';
import StarRating from './StarRating';

interface Review {
  id: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: Date;
}

interface ProductReviewsProps {
  reviews: Review[];
  totalReviews: number;
  averageRating: number;
}

export default function ProductReviews({ reviews, totalReviews, averageRating }: ProductReviewsProps) {
  return (
    <section className="w-full bg-[#333333] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">Reviews</h2>

        <div className="flex flex-col gap-8">
          {reviews.map((review, index) => (
            <div key={review.id}>
              <div className="flex flex-col gap-6">
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#F5EDE0] rounded-full flex items-center justify-center">
                    <Image
                      src="/images/progile.svg"
                      alt="User"
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className="text-lg md:text-xl font-medium ">
                    {review.userName}
                  </span>
                </div>

                {/* Rating */}
                <StarRating rating={review.rating} showNumber size="sm" textColor='white'/>

                {/* Review Title */}
                <h3 className="text-xl md:text-2xl font-medium ">
                  {review.title}
                </h3>

                {/* Review Comment */}
                <p className="text-base md:text-lg  leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* Divider */}
              {index < reviews.length - 1 && (
                <div className="border-t border-gray-600 mt-8" />
              )}
            </div>
          ))}
        </div>

        {/* Load More Button (if needed) */}
        {reviews.length < totalReviews && (
          <div className="mt-12 text-center">
            <button className="px-8 py-3 border-2 font-medium rounded-full transition-colors cursor-pointer">
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
