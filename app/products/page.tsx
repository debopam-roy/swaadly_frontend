'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { productsService } from '@/lib/services/products.service';
import type { Product } from '@/lib/types/product.types';
import ProductCard from '@/components/product/ProductCard';
import Footer from '@/components/footer';

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await productsService.getProducts({
          isActive: true,
          sortBy: 'displayOrder',
          sortOrder: 'asc',
          limit: 100
        });
        setProducts(response.products);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C68642] mx-auto"></div>
          <p className="mt-4">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-[#44c997] rounded-full hover:bg-[#3AB586] transition-colors font-medium"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen ">
      {/* Main Content */}
      <section className="pt-12 pb-12 px-4 md:px-15">
        <div className="max-w-[1320px] mx-auto space-y-8">
          {/* Hero Title */}
          <h1 className="text-3xl md:text-4xl font-display text-white italic text-center tracking-wideer"
              style={{
                WebkitTextStroke: '2px var(--peanut)',
                paintOrder: 'stroke fill',
                fontWeight: 700,
                textShadow: '0px 4px 0px #C68642',
              } as React.CSSProperties}
            >
            Discover our range of
            <br />
            Premium Peanut Butters
          </h1>

          {/* Products Grid - First Row */}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl">No products available at the moment.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {products.slice(0, 3).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {/* Products Grid - Second Row */}
              {products.length > 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {products.slice(3, 6).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}

              {/* Why Choose Our Products Section */}
              <div className="bg-[rgba(95,185,150,0.3)] rounded-2xl p-8 mb-6">
                <h2 className="font-bold text-base tracking-[-0.3125px] mb-6">
                  Why Choose Our Products?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 100% Natural */}
                  <div className="flex flex-col gap-3">
                    <div className="w-12 h-12 bg-[#5fb996] rounded-full flex items-center justify-center">
                      <span className="text-white text-xl tracking-[-0.4492px]">✓</span>
                    </div>
                    <h3 className="font-normal text-base tracking-[-0.3125px]">
                      100% Natural
                    </h3>
                    <p className="text-[#4a5565] text-sm leading-5 tracking-[-0.1504px]">
                      Made from premium quality peanuts with no artificial preservatives or additives.
                    </p>
                  </div>

                  {/* Two Sizes Available */}
                  <div className="flex flex-col gap-3">
                    <div className="w-12 h-12 bg-[#5fb996] rounded-full flex items-center justify-center">
                      <span className="text-white text-xl tracking-[-0.4492px]">✓</span>
                    </div>
                    <h3 className="font-normal text-base tracking-[-0.3125px]">
                      Two Sizes Available
                    </h3>
                    <p className="text-[#4a5565] text-sm leading-5 tracking-[-0.1504px]">
                      Choose between 500g for trying out or 1kg for regular consumption at better value.
                    </p>
                  </div>

                  {/* Rich in Protein */}
                  <div className="flex flex-col gap-3">
                    <div className="w-12 h-12 bg-[#5fb996] rounded-full flex items-center justify-center">
                      <span className="text-white text-xl tracking-[-0.4492px]">✓</span>
                    </div>
                    <h3 className="font-normal text-base tracking-[-0.3125px]">
                      Rich in Protein
                    </h3>
                    <p className="text-[#4a5565] text-sm leading-5 tracking-[-0.1504px]">
                      High protein content to support your fitness goals or healthy lifestyle.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Text */}
              <p className="text-center text-[#6a7282] text-sm leading-5 tracking-[-0.1504px]">
                More exciting products coming soon! Stay tuned for our upcoming range.
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
