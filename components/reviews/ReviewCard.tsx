'use client';

import Image from 'next/image';
import type { Review } from '@/lib/types/review.types';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < review.rating);

  return (
    <div className="bg-white flex flex-col gap-6 md:gap-8 items-center p-4 md:p-6 rounded-2xl w-full max-w-[424px] h-[400px] md:h-[480px]">
      {/* Star Rating */}
      <div className="flex items-center gap-1.5 shrink-0">
        {stars.map((filled, index) => (
          <div key={index} className="relative w-5 h-5 md:w-6 md:h-6">
            <Image
              src={filled ? '/images/filled_star.svg' : '/images/empty_star.svg'}
              alt={filled ? 'Filled star' : 'Empty star'}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Review Title */}
      <h3 className="font-shrikhand italic text-[#28a777] text-xl md:text-[32px] leading-tight md:leading-[44px] text-center line-clamp-2 shrink-0">
        {review.title || 'Great Product!'}
      </h3>

      {/* Review Comment */}
      <p className="font-medium text-[#333] text-base md:text-xl leading-relaxed md:leading-8 text-center line-clamp-4 flex-1">
        &ldquo;{review.comment}&rdquo;
      </p>

      {/* Reviewer Info */}
      <div className="flex flex-col gap-3 md:gap-4 items-center w-full mt-auto shrink-0">
        <div className="relative w-14 h-14 md:w-[72px] md:h-[72px] rounded-full overflow-hidden bg-gray-200">
          <Image
            src="/images/default-avatar.png"
            alt={review.reviewerName}
            fill
            className="object-cover"
          />
        </div>
        <p className="font-medium text-[#333] text-lg md:text-2xl text-center">
          {review.reviewerName}
        </p>
      </div>
    </div>
  );
}
