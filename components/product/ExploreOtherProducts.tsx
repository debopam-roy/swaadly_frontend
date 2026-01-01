'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { productsService } from '@/lib/services/products.service';
import ProductCard from './ProductCard';
import { Product } from '@/lib/types/product.types';

interface ExploreOtherProductsProps {
  /**
   * Products to exclude from the list (e.g., current product or cart items)
   */
  excludeProductIds?: string[];

  /**
   * Number of products to display
   * @default 3
   */
  limit?: number;

  /**
   * Title for the section
   * @default "Explore other products"
   */
  title?: string;

  /**
   * URL for the "VIEW ALL" button
   * @default "/products"
   */
  viewAllUrl?: string;

  /**
   * Show bottom banner image
   * @default false
   */
  showBottomBanner?: boolean;

  /**
   * Custom className for the container
   */
  className?: string;

  /**
   * Callback when "Add to Cart" is clicked on a product
   */
  onAddToCart?: (productId: string) => void;
}

const ExploreOtherProducts: React.FC<ExploreOtherProductsProps> = ({
  excludeProductIds = [],
  limit = 3,
  title = 'Explore other products',
  viewAllUrl = '/products',
  showBottomBanner = false,
  className = '',
  onAddToCart,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsService.getProducts({
          isActive: true,
          limit: 20, // Fetch more to ensure we have enough after filtering
          sortBy: 'displayOrder',
          sortOrder: 'asc',
        });

        // Filter out excluded products and limit to desired number
        const excludeSet = new Set(excludeProductIds);
        const filteredProducts = response.products
          .filter((product) => !excludeSet.has(product.id))
          .slice(0, limit);

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [excludeProductIds, limit]);

  if (loading) {
    return (
      <div className={`w-full py-12 ${className}`}>
        <div className="text-center text-gray-500">Loading products...</div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src='/images/explore_other_products_bg.svg'
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {title}
          </h2>
          <a
            href={viewAllUrl}
            className="hidden sm:inline-block bg-white border-[1] border-black rounded-[100px] px-6 sm:px-10 py-3"
          >
            <span className="font-bold text-sm sm:text-base">
              VIEW ALL
            </span>
          </a>
        </div>

        {/* Products - Horizontal scroll on all screen sizes */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 mb-6">
          <div className="flex gap-6 w-max">
            {products.map((product) => (
              <div key={product.id} className="w-[280px] sm:w-[320px] shrink-0">
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button - Bottom on mobile */}
        <div className="sm:hidden flex justify-center mt-6">
          <a
            href={viewAllUrl}
            className="bg-white border-[1] border-black rounded-[100px] px-10 py-3"
          >
            <span className="font-bold text-sm">
              VIEW ALL
            </span>
          </a>
        </div>
      </div>

      {/* Bottom Banner (optional) */}
      {showBottomBanner && (
        <div className="relative w-full h-32 mt-8">
          <Image
            src="/images/ghee_pot_banner.svg"
            alt="Decorative banner"
            fill
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ExploreOtherProducts;
