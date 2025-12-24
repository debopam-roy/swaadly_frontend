'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { productsService } from '@/lib/services/products.service';
import type { Product } from '@/lib/types/product.types';
import ProductCard from '@/components/product/ProductCard';

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await productsService.getProducts({
          isActive: true,
          sortBy: 'displayOrder',
          sortOrder: 'asc',
          page,
          limit: 12
        });
        setProducts(response.products);
        setTotalPages(response.totalPages);
        setTotal(response.total);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handleAddToCart = (productId: string) => {
    // TODO: Implement add to cart logic
    console.log('Add to cart:', productId);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C68642] mx-auto"></div>
          <p className="mt-4 text-[#333333]">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#333333] mb-2">Error</h2>
          <p className="text-[#333333] mb-4">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-[#44c997] text-[#333333] rounded-full hover:bg-[#3AB586] transition-colors font-medium"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden min-h-[400px] bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/images/products_background.svg')" }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-display text-white italic mb-4"
              style={{
                WebkitTextStroke: '2px var(--peanut)',
                paintOrder: 'stroke fill',
                fontWeight: 700,
                textShadow: '0px 4px 0px #C68642',
              } as React.CSSProperties}
            >
              Our Products
            </h1>
            <p className="text-xl md:text-2xl text-[#333333] max-w-2xl mx-auto">
              Discover our range of premium peanut butter products
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative overflow-hidden bg-[#F5E6D3] py-12 md:py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-[#333333]">No products available at the moment.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className="px-6 py-3 bg-white border-2 border-[#333333] rounded-full text-[#333333] font-medium hover:bg-[#F5EDE0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-[#333333] font-medium">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className="px-6 py-3 bg-white border-2 border-[#333333] rounded-full text-[#333333] font-medium hover:bg-[#F5EDE0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}

              <p className="text-center text-[#333333] mt-4">
                Showing {products.length} of {total} products
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
