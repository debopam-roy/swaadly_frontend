'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { ordersService } from '@/lib/services/orders.service';
import type { Order, OrderStatus } from '@/lib/types/order.types';

export default function OrderDetailsPage() {
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

  const getStatusDisplay = (status: OrderStatus) => {
    switch (status) {
      case 'DELIVERED':
        return { text: 'Delivered', color: '#44C997', bgColor: '#44C99720' };
      case 'CANCELLED':
        return { text: 'Cancelled', color: '#AA0C0C', bgColor: '#AA0C0C20' };
      case 'SHIPPED':
      case 'OUT_FOR_DELIVERY':
        return { text: 'In Transit', color: '#FF7E29', bgColor: '#FF7E2920' };
      default:
        return { text: 'Processing', color: '#C68642', bgColor: '#C6864220' };
    }
  };

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
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C68642] mx-auto"></div>
          <p className="mt-4 ">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3]">
        <div className="text-center">
          <p className="text-[#AA0C0C] text-lg">{error || 'Order not found'}</p>
          <button
            onClick={() => router.push('/orders')}
            className="mt-4 bg-[#44C997] px-8 py-3 rounded-full font-medium hover:bg-[#3AB586] transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusDisplay(order.status);
  const isDelivered = order.status === 'DELIVERED';
  const isCancelled = order.status === 'CANCELLED';

  return (
    <main className="min-h-screen bg-[#F5E6D3]">
      {/* Page Title */}
      <section className="pt-8 md:pt-12 pb-6 md:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.push('/orders')}
            className="mb-4 text-[#C68642] hover:text-[#A66F38] flex items-center gap-2 font-medium"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            Back to Orders
          </button>
          <h1
            className="text-3xl md:text-5xl font-display text-white italic"
            style={{
              WebkitTextStroke: '2px var(--peanut)',
              paintOrder: 'stroke fill',
              fontWeight: 700,
              textShadow: '0px 4px 0px #C68642',
            } as React.CSSProperties}
          >
            Order #{order.orderNumber}
          </h1>
        </div>
      </section>

      {/* Order Details */}
      <section className="pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[36px] overflow-hidden shadow-md">
            {/* Order Header */}
            <div className="bg-white p-6 md:p-9 border-b-2 border-[#F5E6D3]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Status */}
                <div>
                  <p className="text-sm font-medium text-[#666] mb-2">Status</p>
                  <div
                    className="inline-block px-4 py-2 rounded-full font-medium"
                    style={{ backgroundColor: statusInfo.bgColor, color: statusInfo.color }}
                  >
                    {statusInfo.text}
                  </div>
                </div>

                {/* Order Date */}
                <div>
                  <p className="text-sm font-medium text-[#666] mb-2">Order Placed</p>
                  <p className="text-lg font-medium">{formatDate(order.createdAt)}</p>
                </div>

                {/* Delivery Date */}
                {(isDelivered || order.estimatedDelivery) && (
                  <div>
                    <p className="text-sm font-medium text-[#666] mb-2">
                      {isDelivered ? 'Delivered On' : 'Estimated Delivery'}
                    </p>
                    <p className="text-lg font-medium">
                      {isDelivered && order.deliveredAt
                        ? formatDate(order.deliveredAt)
                        : order.estimatedDelivery
                        ? formatDate(order.estimatedDelivery)
                        : 'To be confirmed'}
                    </p>
                  </div>
                )}

                {/* Total Amount */}
                <div>
                  <p className="text-sm font-medium text-[#666] mb-2">Total Amount</p>
                  <p className="text-2xl font-bold">₹{order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6 md:p-9 bg-[#F5E6D3]">
              <h2 className="text-2xl font-bold mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-[24px] p-6 flex flex-col md:flex-row gap-6"
                  >
                    {/* Product Image */}
                    <div className="w-full md:w-32 h-32 rounded-[16px] overflow-hidden bg-[#F5E6D3] flex-shrink-0">
                      {item.productImageUrl ? (
                        <Image
                          src={item.productImageUrl}
                          alt={item.productName}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#C68642]">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-medium mb-2">
                        {item.productName}
                      </h3>
                      <p className="text-base text-[#666] mb-2">
                        {item.variantWeight}{item.variantWeightUnit}
                      </p>
                      <div className="flex items-center gap-4 mb-2">
                        <p className="text-lg">
                          Quantity: <span className="font-medium">{item.quantity}</span>
                        </p>
                        <p className="text-lg">
                          Price: <span className="font-medium">₹{item.unitPrice.toFixed(2)}</span>
                        </p>
                      </div>
                      <p className="text-xl font-bold">
                        Total: ₹{item.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address & Pricing */}
            <div className="p-6 md:p-9 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Shipping Address */}
              <div>
                <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
                <div className="text-base text-[#666] space-y-1">
                  <p className="font-medium">{order.customerName}</p>
                  <p>{order.shippingAddress.line1}</p>
                  {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="pt-2">Phone: {order.customerPhone}</p>
                  <p>Email: {order.customerEmail}</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div>
                <h3 className="text-xl font-bold mb-4">Price Details</h3>
                <div className="space-y-3 text-base">
                  <div className="flex justify-between">
                    <span className="text-[#666]">Subtotal</span>
                    <span className="font-medium">₹{order.subtotal.toFixed(2)}</span>
                  </div>
                  {order.discountAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#666]">Discount</span>
                      <span className="text-[#44C997] font-medium">-₹{order.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  {order.couponDiscount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#666]">Coupon Discount ({order.couponCode})</span>
                      <span className="text-[#44C997] font-medium">-₹{order.couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  {order.taxAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#666]">Tax</span>
                      <span className="font-medium">₹{order.taxAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#666]">Delivery Fee</span>
                    <span className="font-medium">₹{order.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t-2 border-[#F5E6D3] pt-3 flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">₹{order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Information */}
            {(order.trackingNumber || order.courierName) && (
              <div className="p-6 md:p-9 bg-[#F5E6D3]">
                <h3 className="text-xl font-bold mb-4">Tracking Information</h3>
                <div className="space-y-2">
                  {order.courierName && (
                    <p className="text-base text-[#666]">
                      Courier: <span className="font-medium">{order.courierName}</span>
                    </p>
                  )}
                  {order.trackingNumber && (
                    <p className="text-base text-[#666]">
                      Tracking Number: <span className="font-medium">{order.trackingNumber}</span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
