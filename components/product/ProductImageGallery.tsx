'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ProductImage as ProductImageType } from '@/lib/types/product.types';

interface ProductImageGalleryProps {
  images: ProductImageType[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const sortedImages = [...images].sort((a, b) => a.displayOrder - b.displayOrder);
  const currentImage = sortedImages[selectedImage] || sortedImages[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-[#F5EDE0] rounded-2xl overflow-hidden">
        {currentImage && (
          <Image
            src={currentImage.imageUrl}
            alt={currentImage.altText || productName}
            fill
            className="object-cover"
            priority
          />
        )}

        {/* Share Button */}
        <button
          className="absolute top-6 right-6 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          aria-label="Share product"
        >
          <Image src="/images/share.svg" alt="Share" width={16} height={16} />
        </button>
      </div>

    </div>
  );
}
