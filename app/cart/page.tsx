'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/lib/contexts/cart.context';
import type { CartSummary } from '@/lib/types/cart.types';
import CartItem from '@/components/cart/CartItem';
import PriceDetails from '@/components/cart/PriceDetails';
import ExploreOtherProducts from '@/components/product/ExploreOtherProducts';

export default function CartPage() {
  const router = useRouter();
  const { items: cartItems, updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const handleAddToCart = async (productId: string) => {
    // The ExploreOtherProducts component will pass the product ID
    // We need to fetch the product details to add it to cart
    // For now, we'll let the ProductCard component handle navigation to product page
    console.log('Add to cart:', productId);
  };

  const handleBuyNow = () => {
    router.push('/checkout');
  };

  // Calculate cart summary (coupon discount is now handled in checkout)
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
    const subtotal = totalMRP - discountOnMRP;

    return {
      totalMRP,
      discountOnMRP,
      couponDiscount: 0, // Coupons are now applied at checkout
      subtotal,
      deliveryDays: 7,
    };
  };

  const summary = calculateSummary();

  // Get IDs of products already in cart for filtering
  const cartProductIds = cartItems.map(item => item.product.id);

  return (
    <main className="min-h-screen">
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
                <h2 className="text-2xl md:text-3xl font-medium mb-4">
                  Your cart is empty
                </h2>
                <p className="text-lg md:text-xl mb-6">
                  Add some delicious peanut butter to get started!
                </p>
                <button
                  onClick={() => router.push('/')}
                  className="bg-[#44C997] font-medium text-xl px-12 py-4 rounded-[40px] hover:bg-[#3AB586] transition-colors"
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

                {/* Coupon Info Banner */}
                <div className="bg-white p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFF2EA] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-[#FF7E29]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Have a coupon code?</p>
                      <p className="text-sm text-gray-500">
                        Apply coupons at checkout to get discounts
                      </p>
                    </div>
                  </div>
                </div>

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
      <ExploreOtherProducts
        excludeProductIds={cartProductIds}
        title="Explore other products"
        viewAllUrl="/"
        onAddToCart={handleAddToCart}
      />

      {/* Banner Image */}
      <section>
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[682px] overflow-hidden">
          <Image
            src="https://storage.googleapis.com/swaadly-uploads-prod/peanut_butter.svg"
            alt="Swaadly Peanut Butter"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
}
