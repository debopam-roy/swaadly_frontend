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
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

  // Warehouse config state
  const [warehouseConfig, setWarehouseConfig] = useState<WarehouseConfig | null>(null);
  const [isLoadingWarehouse, setIsLoadingWarehouse] = useState(true);

  // Delivery options state
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [selectedDeliveryOptionId, setSelectedDeliveryOptionId] = useState<string | null>(null);
  const [isLoadingDeliveryRates, setIsLoadingDeliveryRates] = useState(false);
  const [deliveryRatesError, setDeliveryRatesError] = useState<string | null>(null);

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
        setDeliveryRatesError('Unable to load shipping configuration. Please refresh the page.');
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
      // Convert weight to grams based on unit
      let weightInGrams = item.variant.weight;
      if (item.variant.weightUnit.toLowerCase() === 'kg') {
        weightInGrams = item.variant.weight * 1000;
      }
      return sum + weightInGrams * item.quantity;
    }, 0);
  }, [cartItems]);

  // Fetch delivery rates when address is selected and warehouse config is loaded
  useEffect(() => {
    const fetchDeliveryRates = async () => {
      if (!selectedAddressId || cartItems.length === 0 || !warehouseConfig) {
        setDeliveryOptions([]);
        setSelectedDeliveryOptionId(null);
        return;
      }

      const address = addresses.find((a) => a.id === selectedAddressId);
      if (!address) return;

      setIsLoadingDeliveryRates(true);
      setDeliveryRatesError(null);

      try {
        const rates = await shippingService.getDeliveryRates({
          pickupPincode: warehouseConfig.pincode,
          deliveryPincode: address.postalCode,
          weight: totalWeight,
          orderAmount: subtotal,
        });

        setDeliveryOptions(rates);
        // Auto-select recommended option or first option
        const recommended = rates.find((r) => r.recommended);
        setSelectedDeliveryOptionId(recommended?.id || rates[0]?.id || null);
      } catch (error) {
        console.error('Failed to fetch delivery rates:', error);
        setDeliveryRatesError('Unable to fetch delivery rates. Please try again.');
        setDeliveryOptions([]);
        setSelectedDeliveryOptionId(null);
      } finally {
        setIsLoadingDeliveryRates(false);
      }
    };

    fetchDeliveryRates();
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

  // Get selected delivery option
  const selectedDeliveryOption = useMemo(() => {
    return deliveryOptions.find((opt) => opt.id === selectedDeliveryOptionId) || null;
  }, [deliveryOptions, selectedDeliveryOptionId]);

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
    // Use real delivery fee from selected option, fallback to 0 if loading
    const deliveryFee = selectedDeliveryOption?.price || 0;
    const total = subtotalAfterDiscount + deliveryFee;

    return {
      totalMRP,
      discountOnMRP,
      couponDiscount,
      subtotal: subtotalAfterDiscount,
      deliveryFee,
      total,
    };
  }, [cartItems, subtotal, appliedCoupon, selectedDeliveryOption]);

  const handleCouponApplied = (coupon: AppliedCoupon | null) => {
    setAppliedCoupon(coupon);
  };

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  // Place order handler
  const handlePlaceOrder = async () => {
    if (!selectedAddressId || !selectedDeliveryOptionId) {
      setOrderError('Please select a delivery address and delivery option.');
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
        deliveryOptionId: selectedDeliveryOptionId,
      };

      const order = await ordersService.createOrder(orderData);

      // Clear cart on success
      clearCart();

      // Redirect to order confirmation page
      router.push(`/orders/${order.id}/confirmation`);
    } catch (error: unknown) {
      console.error('Failed to place order:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to place order. Please try again.';
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

              {/* Delivery Options */}
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-100">
                  <h3 className="text-lg md:text-xl font-medium">
                    Delivery Options
                  </h3>
                </div>

                <div className="p-4 md:p-6">
                  {isLoadingWarehouse ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-8 h-8 border-2 border-[#44C997] border-t-transparent rounded-full animate-spin" />
                      <span className="ml-3 text-gray-600">
                        Loading shipping configuration...
                      </span>
                    </div>
                  ) : !selectedAddressId ? (
                    <p className="text-gray-500 text-center py-4">
                      Please select a delivery address to view delivery options
                    </p>
                  ) : isLoadingDeliveryRates ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-8 h-8 border-2 border-[#44C997] border-t-transparent rounded-full animate-spin" />
                      <span className="ml-3 text-gray-600">
                        Calculating delivery rates...
                      </span>
                    </div>
                  ) : deliveryRatesError ? (
                    <div className="text-center py-4">
                      <p className="text-red-500 mb-2">{deliveryRatesError}</p>
                      <button
                        onClick={() => {
                          // Trigger re-fetch by toggling address
                          const currentId = selectedAddressId;
                          setSelectedAddressId(null);
                          setTimeout(() => setSelectedAddressId(currentId), 100);
                        }}
                        className="text-sm text-[#44C997] hover:underline"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : deliveryOptions.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      No delivery options available for this location
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {deliveryOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedDeliveryOptionId === option.id
                              ? 'border-[#44C997] bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="deliveryOption"
                              value={option.id}
                              checked={selectedDeliveryOptionId === option.id}
                              onChange={() =>
                                setSelectedDeliveryOptionId(option.id)
                              }
                              className="w-4 h-4 text-[#44C997] focus:ring-[#44C997]"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{option.name}</span>
                                {option.recommended && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                    Recommended
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">
                                Estimated: {option.deliveryTime}
                              </p>
                            </div>
                          </div>
                          <span className="font-medium">
                            ₹{option.price.toFixed(2)}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
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
                      <span>
                        {calculations.deliveryFee === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `₹${calculations.deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>
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

                  <button
                    onClick={handlePlaceOrder}
                    disabled={
                      !selectedAddressId ||
                      !selectedDeliveryOptionId ||
                      isPlacingOrder ||
                      isLoadingDeliveryRates
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

                  {selectedAddressId && !selectedDeliveryOptionId && !isLoadingDeliveryRates && (
                    <p className="text-sm text-red-500 text-center mt-2">
                      Please select a delivery option
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
