'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { productsService } from '@/lib/services/products.service';
import type { Product } from '@/lib/types/product.types';

interface ProductGridProps {
  limit?: number;
  onAddToCart?: (productId: string) => void;
}

export default function ProductGrid({ limit = 3, onAddToCart }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await productsService.getProducts({
          isActive: true,
          limit,
          sortBy: 'displayOrder',
          sortOrder: 'asc',
        });
        setProducts(response.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [limit]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C68642]"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Horizontal scroll on small and tablet screens */}
      <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
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

      {/* Grid layout on large screens only */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
