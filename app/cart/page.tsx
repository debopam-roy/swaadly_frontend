'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/lib/contexts/cart.context';
import { productsService } from '@/lib/services/products.service';
import type { Product } from '@/lib/types/product.types';
import type { CartSummary } from '@/lib/types/cart.types';
import CartItem from '@/components/cart/CartItem';
import CouponSection from '@/components/cart/CouponSection';
import PriceDetails from '@/components/cart/PriceDetails';
import ProductCard from '@/components/product/ProductCard';

export default function CartPage() {
  const router = useRouter();
  const { items: cartItems, updateQuantity, removeItem, addToCart } = useCart();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch related/other products
        const response = await productsService.getProducts({
          isActive: true,
          limit: 3,
          sortBy: 'totalSales',
          sortOrder: 'desc',
        });
        setRelatedProducts(response.products);
      } catch (error) {
        console.error('Failed to fetch cart data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const handleApplyCoupon = (code: string) => {
    setAppliedCoupon(code);
    // TODO: Validate and apply coupon logic
  };

  const handleAddToCart = (productId: string) => {
    const product = relatedProducts.find((p) => p.id === productId);
    if (product) {
      const defaultVariant = product.variants?.find((v) => v.isDefault) || product.variants?.[0];
      if (defaultVariant) {
        addToCart(product, defaultVariant, 1);
      }
    }
  };

  const handleBuyNow = () => {
    router.push('/checkout');
  };

  // Calculate cart summary
  const calculateSummary = (): CartSummary => {
    const totalMRP = cartItems.reduce(
      (sum, item) => sum + item.variant.mrp * item.quantity,
      0
    );
    const discountOnMRP = cartItems.reduce(
      (sum, item) =>
        sum + (item.variant.mrp - item.variant.sellingPrice) * item.quantity,
      0
    );
    const couponDiscount = appliedCoupon ? 100 : 0; // Mock coupon discount
    const subtotal = totalMRP - discountOnMRP - couponDiscount;

    return {
      totalMRP,
      discountOnMRP,
      couponDiscount,
      subtotal,
      deliveryDays: 7,
    };
  };

  const summary = calculateSummary();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C68642] mx-auto"></div>
          <p className="mt-4 text-[#333333]">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5E6D3]">
      {/* Page Title */}
      <section className="pt-8 md:pt-12 pb-6 md:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
              className="text-3xl md:text-4xl font-display text-white italic"
              style={{
                WebkitTextStroke: '2px var(--peanut)',
                paintOrder: 'stroke fill',
                fontWeight: 700,
                textShadow: '0px 4px 0px #C68642',
              } as React.CSSProperties}
            >
            Shopping Cart
          </h1>
        </div>
      </section>

      {/* Cart Content */}
      <section className="pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F5E6D3] rounded-[36px] overflow-hidden">
            {cartItems.length === 0 ? (
              <div className="bg-white p-12 md:p-20 text-center rounded-[36px]">
                <h2 className="text-2xl md:text-3xl font-medium text-[#333333] mb-4">
                  Your cart is empty
                </h2>
                <p className="text-lg md:text-xl text-[#333333] mb-6">
                  Add some delicious peanut butter to get started!
                </p>
                <button
                  onClick={() => router.push('/')}
                  className="bg-[#44C997] text-[#333333] font-medium text-xl px-12 py-4 rounded-[40px] hover:bg-[#3AB586] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {/* Cart Items */}
                <div className="bg-[#F5E6D3] flex flex-col gap-3">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>

                {/* Coupon Section */}
                <CouponSection
                  onApplyCoupon={handleApplyCoupon}
                  appliedCoupon={appliedCoupon}
                />

                {/* Price Details */}
                <PriceDetails
                  summary={summary}
                  itemCount={cartItems.length}
                  onBuyNow={handleBuyNow}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Explore Other Products */}
      <section>
        <div className="relative overflow-hidden py-12 md:py-16">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Image
              src="/images/behind_prism.svg"
              alt=""
              fill
              className="object-cover rotate-180 scale-y-[-1]"
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#333333]">
                Explore other products
              </h2>
              <button
                onClick={() => router.push('/')}
                className="bg-white border-2 border-[#333333] px-12 md:px-16 py-3 md:py-4 rounded-full text-base md:text-lg font-bold text-[#333333] hover:bg-[#F5EDE0] transition-colors"
              >
                VIEW ALL
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Banner Image */}
      <section>
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[682px] overflow-hidden">
          <Image
            src="/images/peanut_butter.svg"
            alt="Swaadly Peanut Butter"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
}
