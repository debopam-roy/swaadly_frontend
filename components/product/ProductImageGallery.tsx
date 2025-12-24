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
      </div>
  );
}
