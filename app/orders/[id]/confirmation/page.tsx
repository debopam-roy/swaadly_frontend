'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ordersService } from '@/lib/services/orders.service';
import type { Order } from '@/lib/types/order.types';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await ordersService.getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        console.error('Failed to fetch order:', err);
        setError('Failed to load order details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#44C997] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order confirmation...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error || 'Order not found'}</p>
          <button
            onClick={() => router.push('/orders')}
            className="mt-4 bg-[#44C997] text-white px-8 py-3 rounded-full font-medium hover:bg-[#3AB586] transition-colors"
          >
            View My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Success Header */}
      <section className="pt-8 md:pt-12 pb-6 md:pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-[#44C997]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1
            className="text-3xl md:text-4xl font-display text-white italic mb-4"
            style={{
              WebkitTextStroke: '2px var(--peanut)',
              paintOrder: 'stroke fill',
              fontWeight: 700,
              textShadow: '0px 4px 0px #C68642',
            } as React.CSSProperties}
          >
            Order Placed Successfully!
          </h1>

          <p className="text-gray-600 mb-2">
            Thank you for your order. We&apos;ve received it and will begin processing soon.
          </p>

          <p className="text-lg font-medium">
            Order Number:{' '}
            <span className="text-[#44C997]">{order.orderNumber}</span>
          </p>
        </div>
      </section>

      {/* Order Details */}
      <section>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tracking Info */}
          {order.trackingNumber && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 md:p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-[#44C997]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-green-800 mb-1">
                    Shipment Created
                  </h3>
                  <p className="text-sm text-green-700">
                    Tracking Number:{' '}
                    <span className="font-mono font-medium">
                      {order.trackingNumber}
                    </span>
                  </p>
                  {order.courierName && (
                    <p className="text-sm text-green-700">
                      Courier: {order.courierName}
                    </p>
                  )}
                  {order.estimatedDelivery && (
                    <p className="text-sm text-green-700">
                      Estimated Delivery: {formatDate(order.estimatedDelivery)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Order Summary Card */}
          <div className="bg-white rounded-xl overflow-hidden mb-6">
            <div className="p-4 md:p-6 border-b border-gray-100">
              <h2 className="text-lg md:text-xl font-medium">Order Summary</h2>
            </div>

            {/* Order Items */}
            <div className="p-4 md:p-6 border-b border-gray-100">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.productImageUrl && (
                        <Image
                          src={item.productImageUrl}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate text-sm">
                        {item.productName}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {item.variantWeight}
                        {item.variantWeightUnit} x {item.quantity}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        ₹{item.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="p-4 md:p-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{order.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                {order.couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      Coupon ({order.couponCode})
                    </span>
                    <span>-₹{order.couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>
                    {order.deliveryFee === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${order.deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-medium text-base">
                    <span>Total</span>
                    <span>₹{order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-xl overflow-hidden mb-6">
            <div className="p-4 md:p-6 border-b border-gray-100">
              <h2 className="text-lg md:text-xl font-medium">Delivery Address</h2>
            </div>
            <div className="p-4 md:p-6">
              <p className="font-medium">{order.customerName}</p>
              <p className="text-sm text-gray-600 mt-1">
                {order.shippingAddress.line1}
                {order.shippingAddress.line2 && `, ${order.shippingAddress.line2}`}
              </p>
              <p className="text-sm text-gray-600">
                {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                {order.shippingAddress.postalCode}
              </p>
              <p className="text-sm text-gray-500 mt-1">{order.customerPhone}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/orders/${order.id}`}
              className="flex-1 py-4 bg-[#44C997] text-white font-medium rounded-xl hover:bg-[#3AB586] transition-colors text-center"
            >
              Track Order
            </Link>
            <Link
              href="/"
              className="flex-1 py-4 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
