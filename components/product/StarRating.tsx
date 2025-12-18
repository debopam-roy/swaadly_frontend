'use client';

import Image from 'next/image';

interface StarRatingProps {
  rating: number;
  totalReviews?: number;
  showNumber?: boolean;
  size?: 'sm' | 'md' | 'lg';
  textColor?: 'black' | 'white';
}

export default function StarRating({
  rating,
  totalReviews,
  showNumber = true,
  size = 'md',
  textColor= 'black',
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6 md:w-8 md:h-8',
    lg: 'w-8 h-8',
  };

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg md:text-2xl',
    lg: 'text-2xl',
  };

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(rating));

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <div className="flex items-center gap-1 md:gap-2">
        {stars.map((filled, index) => (
          <div key={index} className={`${sizeClasses[size]} relative`}>
            <Image
              src={filled ? '/images/filled_star.svg' : '/images/empty_star.svg'}
              alt={filled ? 'Filled star' : 'Empty star'}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
      {showNumber && (
        <span className={`${textSizeClasses[size]} font-medium text-${textColor === 'black' ? 'black' : 'white'}`}>
          {rating.toFixed(1)}
          {totalReviews && (
            <span className="text-gray-500 ml-1">({totalReviews})</span>
          )}
        </span>
      )}
    </div>
  );
}
