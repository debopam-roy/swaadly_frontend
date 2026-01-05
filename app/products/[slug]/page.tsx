'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { productsService } from '@/lib/services/products.service';
import type { Product, ProductVariant } from '@/lib/types/product.types';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductReviews from '@/components/product/ProductReviews';
import ExploreOtherProducts from '@/components/product/ExploreOtherProducts';
import EatSuggestionCard from '@/components/product/EatSuggestionCard';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await productsService.getProductBySlug(slug);
        setProduct(data);
        // Set default variant
        const defaultVariant = data.variants?.find((v) => v.isDefault) || data.variants?.[0];
        if (defaultVariant) {
          setSelectedVariant(defaultVariant);
        }
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C68642] mx-auto"></div>
          <p className="mt-4 ">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="mb-4">{error || 'The product you are looking for does not exist.'}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-primary_button rounded-full hover:bg-[#3AB586] transition-colors font-medium"
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
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      {product.aboutProduct && (
        <section className=" min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full">

            {/* About Text */}
            <div className="flex flex-col gap-6 md:gap-8 bg-white p-6 md:p-12 h-full">
              <h2 className="text-2xl md:text-3xl font-bold ">
                About this product
              </h2>
              <div className="flex flex-col gap-4 text-base md:text-lg leading-relaxed">
                <p>{product.aboutProduct}</p>
              </div>
            </div>

            {/* About Image */}
            {product.bestWayToEatImageUrl && (
              <div className="relative w-full h-full aspect-square lg:aspect-auto overflow-hidden">
                <Image
                  src={product.bestWayToEatImageUrl}
                  alt={`About ${product.name}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}

          </div>
        </section>
      )}

      {/* Best Ways to Eat Section */}
      <section className="py-12 md:py-16 bg-[#fcf1e2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[40px] font-bold text-center mb-8 md:mb-10 leading-11">
            Best ways to eat
          </h2>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <EatSuggestionCard
              imageSrc="https://storage.googleapis.com/swaadly-uploads-prod/bread_spread.png"
              title="Spread on roti or bread"
            />
            <EatSuggestionCard
              imageSrc="https://storage.googleapis.com/swaadly-uploads-prod/fruit_pair.png"
              title="Pair with fruits"
            />
            <EatSuggestionCard
              imageSrc="https://storage.googleapis.com/swaadly-uploads-prod/eat_direct.png"
              title="Eat directly by the spoon"
            />
          </div>
        </div>
      </section>

      {/* Related Products */}
      {product && (
        <ExploreOtherProducts
          excludeProductIds={[product.id]}
          title="Explore other products"
          viewAllUrl="/products"
          className="min-h-screen"
        />
      )}


      {/* Reviews Section */}
      <ProductReviews productId={product.id} variantId={selectedVariant?.id} />
    </main>
  );
}
