'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { productsService } from '@/lib/services/products.service';
import type { Product } from '@/lib/types/product.types';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductReviews from '@/components/product/ProductReviews';
import ProductCard from '@/components/product/ProductCard';

// Mock reviews data - Replace with actual API call
const mockReviews = [
  {
    id: '1',
    userName: 'Arpit Goyal',
    rating: 4.4,
    title: 'Good product',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    createdAt: new Date(),
  },
  {
    id: '2',
    userName: 'Arpit Goyal',
    rating: 4.4,
    title: 'Good product',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    createdAt: new Date(),
  },
];

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await productsService.getProductBySlug(slug);
        setProduct(data);

        // Fetch related products
        const response = await productsService.getProducts({
          isActive: true,
          limit: 3
        });
        const related = response.products.filter((p) => p.id !== data.id).slice(0, 3);
        setRelatedProducts(related);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleAddToCart = (variantId: string, quantity: number) => {
    // TODO: Implement add to cart logic
    console.log('Add to cart:', variantId, quantity);
  };

  const handleBuyNow = (variantId: string, quantity: number) => {
    // TODO: Implement buy now logic
    console.log('Buy now:', variantId, quantity);
    router.push('/checkout');
  };

  const handleAddRelatedToCart = (productId: string) => {
    // TODO: Implement add to cart for related products
    console.log('Add related product to cart:', productId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C68642] mx-auto"></div>
          <p className="mt-4 text-[#333333]">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#333333] mb-2">Product Not Found</h2>
          <p className="text-[#333333] mb-4">{error || 'The product you are looking for does not exist.'}</p>
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
      {/* Hero Section - Product Details */}
      <section className=" py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display text-white italic"
              style={{
                WebkitTextStroke: '2px var(--peanut)',
                paintOrder: 'stroke fill',
                fontWeight: 700,
                textShadow: '0px 4px 0px #C68642',
              } as React.CSSProperties}
            >
            Peanut Butter
          </h2>

          {/* Product Main Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            {/* Left: Image Gallery */}
            {product.images && product.images.length > 0 && (
              <ProductImageGallery images={product.images} productName={product.name} />
            )}

            {/* Right: Product Info */}
            <ProductInfo
              product={product}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className=" min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full">
          
          {/* About Text */}
          <div className="flex flex-col gap-6 md:gap-8 bg-white p-6 md:p-12 h-full">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333]">
              About this product
            </h2>
            <div className="flex flex-col gap-4 text-base md:text-lg text-[#333333] leading-relaxed">
              <p>{product.longDescription || product.shortDescription}</p>
              {product.usageInstructions && <p>{product.usageInstructions}</p>}
            </div>
          </div>

          {/* About Image */}
          <div className="relative w-full h-full aspect-square lg:aspect-auto overflow-hidden">
            <Image
              src="/images/peanut_butter.svg"
              alt="Product details"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </section>

      {/* Best Ways to Eat Section */}
      <section className="min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full">
          
          {/* Image First on Mobile, Text on Desktop */}
          <div className="relative w-full h-full aspect-square lg:aspect-auto overflow-hidden order-2 lg:order-1">
            <Image
              src="/images/best_way_to_eat.svg"
              alt="Best ways to eat"
              fill
              className="object-cover"
            />
          </div>
          {/* Text */}
          <div className="flex flex-col gap-6 md:gap-8 bg-primary_button p-6 md:p-12 h-full order-1 lg:order-2">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333]">
              Best ways to eat
            </h2>
            <div className="flex flex-col gap-4 text-base md:text-lg text-[#333333] leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
<section
  className="relative overflow-hidden min-h-screen bg-cover bg-no-repeat bg-center"
  style={{ backgroundImage: "url('/images/products_background.svg')" }}
>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
    <div className="flex items-center justify-center md:justify-between gap-4 mb-10 md:mb-12 flex-wrap">
      <h2 className="text-3xl md:text-4xl font-bold text-[#333333]">
        Explore other products
      </h2>
      <button
        onClick={() => router.push('/products')}
        className="bg-white border-2 border-[#333333] px-12 md:px-16 py-3 md:py-4 rounded-full text-base md:text-lg font-bold text-[#333333] hover:bg-[#F5EDE0] transition-colors"
      >
        VIEW ALL
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedProducts.map((relatedProduct) => (
        <ProductCard
          key={relatedProduct.id}
          product={relatedProduct}
          onAddToCart={handleAddRelatedToCart}
        />
      ))}
    </div>
  </div>
</section>


      {/* Reviews Section */}
      <ProductReviews
        reviews={mockReviews}
        totalReviews={product.totalReviews}
        averageRating={product.averageRating}
      />
    </main>
  );
}
