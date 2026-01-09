'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/lib/contexts/cart.context';
import { useAuth } from '@/lib/contexts/auth.context';
import { addressesService } from '@/lib/services/addresses.service';
import { shippingService } from '@/lib/services/shipping.service';
import { ordersService } from '@/lib/services/orders.service';
import CouponSelector from '@/components/checkout/CouponSelector';
import type { Address } from '@/lib/types/address.types';
import type { AppliedCoupon, CartItemForValidation } from '@/lib/types/coupon.types';
import type { DeliveryOption, WarehouseConfig } from '@/lib/types/shipping.types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cartItems, subtotal, clearCart } = useCart();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

  // Warehouse config state
  const [warehouseConfig, setWarehouseConfig] = useState<WarehouseConfig | null>(null);
  const [isLoadingWarehouse, setIsLoadingWarehouse] = useState(true);

  // Delivery state - auto-selected best option
  const [bestDeliveryOption, setBestDeliveryOption] = useState<DeliveryOption | null>(null);
  const [isLoadingDelivery, setIsLoadingDelivery] = useState(false);
  const [deliveryError, setDeliveryError] = useState<string | null>(null);

  // Order placement state
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login?redirect=/checkout');
    }
  }, [authLoading, isAuthenticated, router]);

  // Redirect to cart if empty
  useEffect(() => {
    if (!authLoading && cartItems.length === 0) {
      router.push('/cart');
    }
  }, [authLoading, cartItems.length, router]);

  // Fetch warehouse configuration on mount
  useEffect(() => {
    const fetchWarehouseConfig = async () => {
      try {
        const config = await shippingService.getWarehouseConfig();
        setWarehouseConfig(config);
      } catch (error) {
        console.error('Failed to fetch warehouse config:', error);
        setDeliveryError('Unable to load shipping configuration. Please refresh the page.');
      } finally {
        setIsLoadingWarehouse(false);
      }
    };

    fetchWarehouseConfig();
  }, []);

  // Fetch user addresses
  useEffect(() => {
    if (isAuthenticated) {
      fetchAddresses();
    }
  }, [isAuthenticated]);

  const fetchAddresses = async () => {
    try {
      const userAddresses = await addressesService.getAll();
      setAddresses(userAddresses);
      // Select default address
      const defaultAddr = userAddresses.find((a) => a.isDefault);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
      } else if (userAddresses.length > 0) {
        setSelectedAddressId(userAddresses[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  // Calculate total weight in grams
  const totalWeight = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      let weightInGrams = item.variant.weight;
      if (item.variant.weightUnit.toLowerCase() === 'kg') {
        weightInGrams = item.variant.weight * 1000;
      }
      return sum + weightInGrams * item.quantity;
    }, 0);
  }, [cartItems]);

  // Fetch delivery rates and auto-select best option when address is selected
  useEffect(() => {
    const fetchAndSelectBestDelivery = async () => {
      if (!selectedAddressId || cartItems.length === 0 || !warehouseConfig) {
        setBestDeliveryOption(null);
        return;
      }

      const address = addresses.find((a) => a.id === selectedAddressId);
      if (!address) return;

      setIsLoadingDelivery(true);
      setDeliveryError(null);

      try {
        const rates = await shippingService.getDeliveryRates({
          pickupPincode: warehouseConfig.pincode,
          deliveryPincode: address.postalCode,
          weight: totalWeight,
          orderAmount: subtotal,
        });

        if (rates.length === 0) {
          setDeliveryError('No delivery options available for this location');
          setBestDeliveryOption(null);
          return;
        }

        // Auto-select best option: lowest price, then fastest delivery
        const parseDays = (time: string): number => {
          const match = time.match(/(\d+)/);
          return match ? parseInt(match[1], 10) : 999;
        };

        const best = rates.reduce((bestOption, current) => {
          const bestDays = parseDays(bestOption.deliveryTime);
          const currentDays = parseDays(current.deliveryTime);

          // If prices are equal, prefer faster delivery
          if (current.price === bestOption.price) {
            return currentDays < bestDays ? current : bestOption;
          }
          // Otherwise prefer lower price
          return current.price < bestOption.price ? current : bestOption;
        }, rates[0]);

        setBestDeliveryOption(best);
      } catch (error) {
        console.error('Failed to fetch delivery rates:', error);
        setDeliveryError('Unable to calculate delivery rates. Please try again.');
        setBestDeliveryOption(null);
      } finally {
        setIsLoadingDelivery(false);
      }
    };

    fetchAndSelectBestDelivery();
  }, [selectedAddressId, addresses, cartItems.length, totalWeight, subtotal, warehouseConfig]);

  // Convert cart items to validation format
  const cartItemsForValidation: CartItemForValidation[] = useMemo(() => {
    return cartItems.map((item) => ({
      productId: item.product.id,
      variantId: item.variant.id,
      variantSku: item.variant.sku,
      productName: item.product.name,
      quantity: item.quantity,
      unitPrice: item.variant.sellingPrice,
      unitMrp: item.variant.mrp,
      tags: item.product.tags,
    }));
  }, [cartItems]);

  // Calculate totals
  const calculations = useMemo(() => {
    const totalMRP = cartItems.reduce(
      (sum, item) => sum + item.variant.mrp * item.quantity,
      0
    );
    const discountOnMRP = cartItems.reduce(
      (sum, item) =>
        sum + (item.variant.mrp - item.variant.sellingPrice) * item.quantity,
      0
    );
    const couponDiscount = appliedCoupon?.discountAmount || 0;
    const subtotalAfterDiscount = subtotal - couponDiscount;
    const deliveryFee = bestDeliveryOption?.price || 0;
    const total = subtotalAfterDiscount + deliveryFee;

    return {
      totalMRP,
      discountOnMRP,
      couponDiscount,
      subtotal: subtotalAfterDiscount,
      deliveryFee,
      total,
    };
  }, [cartItems, subtotal, appliedCoupon, bestDeliveryOption]);

  const handleCouponApplied = (coupon: AppliedCoupon | null) => {
    setAppliedCoupon(coupon);
  };

  // Place order handler
  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      setOrderError('Please select a delivery address.');
      return;
    }

    if (!bestDeliveryOption) {
      setOrderError('Unable to calculate delivery. Please try again.');
      return;
    }

    setIsPlacingOrder(true);
    setOrderError(null);

    try {
      const orderData = {
        addressId: selectedAddressId,
        items: cartItems.map((item) => ({
          productId: item.product.id,
          variantId: item.variant.id,
          quantity: item.quantity,
        })),
        couponCode: appliedCoupon?.code,
      };

      const order = await ordersService.createOrder(orderData);

      // Clear cart on success
      clearCart();

      // Redirect to order confirmation page
      router.push(`/orders/${order.id}/confirmation`);
    } catch (error: unknown) {
      console.error('Failed to place order:', JSON.stringify(error, null, 2));
      console.error('Error object:', error);

      // Check if it's a verification required error
      const apiError = error as { statusCode?: number; message?: string; code?: string };

      // Check for verification required - by code or by message content
      const isVerificationRequired =
        apiError.code === 'VERIFICATION_REQUIRED' ||
        (apiError.statusCode === 403 && apiError.message?.toLowerCase().includes('verification required'));

      if (isVerificationRequired) {
        // Redirect to verification page
        router.push('/verify?redirect=/checkout');
        return;
      }

      const errorMessage =
        error instanceof Error
          ? error.message
          : apiError.message || 'Failed to place order. Please try again.';
      setOrderError(errorMessage);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Loading state
  if (authLoading || (isAuthenticated && cartItems.length === 0)) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#44C997] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20">
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
            Checkout
          </h1>
        </div>
      </section>

      {/* Checkout Content */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Address & Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg md:text-xl font-medium">
                      Delivery Address
                    </h3>
                    <button
                      onClick={() => router.push('/profile/addresses')}
                      className="text-sm text-[#44C997] hover:underline"
                    >
                      Manage Addresses
                    </button>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  {isLoadingAddresses ? (
                    <div className="flex justify-center py-8">
                      <div className="w-8 h-8 border-2 border-[#44C997] border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No addresses saved</p>
                      <button
                        onClick={() => router.push('/profile/addresses')}
                        className="px-6 py-3 bg-[#44C997] text-white font-medium rounded-lg hover:bg-[#3AB586] transition-colors"
                      >
                        Add Address
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {addresses.map((address) => (
                        <label
                          key={address.id}
                          className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedAddressId === address.id
                              ? 'border-[#44C997] bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="address"
                            value={address.id}
                            checked={selectedAddressId === address.id}
                            onChange={() => setSelectedAddressId(address.id)}
                            className="mt-1 w-4 h-4 text-[#44C997] focus:ring-[#44C997]"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">
                                {address.fullName}
                              </span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                {address.addressType}
                              </span>
                              {address.isDefault && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {address.addressLine1}
                              {address.addressLine2 &&
                                `, ${address.addressLine2}`}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.city}, {address.state} -{' '}
                              {address.postalCode}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {address.phoneNumber}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-100">
                  <h3 className="text-lg md:text-xl font-medium">
                    Order Items ({cartItems.length})
                  </h3>
                </div>

                <div className="p-4 md:p-6">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {item.product.images?.[0]?.imageUrl && (
                            <Image
                              src={item.product.images[0].imageUrl}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {item.variant.weight}
                            {item.variant.weightUnit}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </span>
                            <span className="font-medium">
                              ₹
                              {(
                                item.variant.sellingPrice * item.quantity
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Coupon Section */}
              <CouponSelector
                cartItems={cartItemsForValidation}
                cartTotal={subtotal}
                appliedCoupon={appliedCoupon}
                onCouponApplied={handleCouponApplied}
                isAuthenticated={isAuthenticated}
              />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl overflow-hidden sticky top-4">
                <div className="p-4 md:p-6 border-b border-gray-100">
                  <h3 className="text-lg md:text-xl font-medium">
                    Order Summary
                  </h3>
                </div>

                <div className="p-4 md:p-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total MRP</span>
                      <span>₹{calculations.totalMRP.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount on MRP</span>
                      <span>-₹{calculations.discountOnMRP.toFixed(2)}</span>
                    </div>
                    {calculations.couponDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Coupon Discount</span>
                        <span>-₹{calculations.couponDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      {isLoadingWarehouse || isLoadingDelivery ? (
                        <span className="text-gray-400 text-xs">Calculating...</span>
                      ) : deliveryError ? (
                        <span className="text-red-500 text-xs">Error</span>
                      ) : !selectedAddressId ? (
                        <span className="text-gray-400 text-xs">Select address</span>
                      ) : calculations.deliveryFee === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        <span>₹{calculations.deliveryFee.toFixed(2)}</span>
                      )}
                    </div>
                    {bestDeliveryOption && (
                      <div className="text-xs text-gray-500 pl-2">
                        via {bestDeliveryOption.name} ({bestDeliveryOption.deliveryTime})
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>₹{calculations.total.toFixed(2)}</span>
                    </div>
                    {calculations.discountOnMRP + calculations.couponDiscount >
                      0 && (
                      <p className="text-sm text-green-600 mt-1">
                        You save ₹
                        {(
                          calculations.discountOnMRP +
                          calculations.couponDiscount
                        ).toFixed(2)}{' '}
                        on this order
                      </p>
                    )}
                  </div>

                  {deliveryError && selectedAddressId && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-600">{deliveryError}</p>
                      <button
                        onClick={() => {
                          const currentId = selectedAddressId;
                          setSelectedAddressId(null);
                          setTimeout(() => setSelectedAddressId(currentId), 100);
                        }}
                        className="text-xs text-red-700 underline mt-1"
                      >
                        Try again
                      </button>
                    </div>
                  )}

                  <button
                    onClick={handlePlaceOrder}
                    disabled={
                      !selectedAddressId ||
                      !bestDeliveryOption ||
                      isPlacingOrder ||
                      isLoadingDelivery ||
                      isLoadingWarehouse
                    }
                    className="w-full mt-6 py-4 bg-[#44C997] text-white font-medium rounded-xl hover:bg-[#3AB586] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isPlacingOrder ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>

                  {orderError && (
                    <p className="text-sm text-red-500 text-center mt-2">
                      {orderError}
                    </p>
                  )}

                  {!selectedAddressId && (
                    <p className="text-sm text-red-500 text-center mt-2">
                      Please select a delivery address
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
