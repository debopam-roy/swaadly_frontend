'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ordersService } from '@/lib/services/orders.service';
import type { OrderSummary, OrderStatus } from '@/lib/types/order.types';

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await ordersService.getOrders({
          sortBy: 'createdAt',
          sortOrder: 'desc',
        });
        console.log('Orders API response:', response);
        console.log('Orders array:', response.orders);
        setOrders(response.orders);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusDisplay = (status: OrderStatus) => {
    switch (status) {
      case 'DELIVERED':
        return { text: 'Delivered', color: '#44C997' };
      case 'CANCELLED':
        return { text: 'Cancelled', color: '#AA0C0C' };
      case 'SHIPPED':
      case 'OUT_FOR_DELIVERY':
        return { text: 'In Transit', color: '#FF7E29' };
      default:
        return { text: 'Processing', color: '#C68642' };
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

  const handleViewOrder = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C68642] mx-auto"></div>
          <p className="mt-4 ">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3]">
        <div className="text-center">
          <p className="text-[#AA0C0C] text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#44C997] px-8 py-3 rounded-full font-medium hover:bg-[#3AB586] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
            Your Orders
          </h1>
        </div>
      </section>

      {/* Orders List */}
      <section className="pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {orders.length === 0 ? (
            <div className="bg-white p-12 md:p-20 text-center rounded-[36px]">
              <h2 className="text-2xl md:text-3xl font-medium mb-4">
                No orders yet
              </h2>
              <p className="text-lg md:text-xl mb-6">
                Start shopping to see your orders here!
              </p>
              <button
                onClick={() => router.push('/')}
                className="bg-[#44C997] font-medium text-xl px-12 py-4 rounded-[40px] hover:bg-[#3AB586] transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {orders.map((order) => {
                const statusInfo = getStatusDisplay(order.status);
                const isDelivered = order.status === 'DELIVERED';
                const isCancelled = order.status === 'CANCELLED';

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-[36px] overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleViewOrder(order.id)}
                  >
                    {/* Order Header */}
                    <div className="bg-white p-6 md:p-9 flex flex-wrap gap-6 md:gap-8 justify-between items-center border-b-2 border-[#F5E6D3]">
                      {/* Status or Delivery Date */}
                      <div className="flex flex-col gap-3">
                        {isCancelled ? (
                          <p className="text-2xl md:text-4xl font-bold text-[#AA0C0C]">
                            {statusInfo.text}
                          </p>
                        ) : isDelivered ? (
                          <>
                            <p className="text-lg md:text-2xl font-bold ">
                              Delivered
                            </p>
                            <p className="text-base md:text-xl font-light ">
                              Order completed
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-lg md:text-2xl font-medium ">
                              Estimated delivery
                            </p>
                            <p className="text-base md:text-xl font-light ">
                              {order.estimatedDelivery
                                ? formatDate(order.estimatedDelivery)
                                : 'To be confirmed'}
                            </p>
                          </>
                        )}
                      </div>

                      {/* Order Placed Date */}
                      {!isCancelled && (
                        <div className="flex flex-col gap-3">
                          <p className="text-lg md:text-2xl font-medium ">
                            Order Placed on
                          </p>
                          <p className="text-base md:text-xl font-light ">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      )}

                      {/* Total Amount */}
                      <div className="flex flex-col gap-3">
                        <p className="text-lg md:text-2xl font-medium ">
                          Total
                        </p>
                        <p className="text-base md:text-xl font-light ">
                          ₹{order.totalAmount.toFixed(2)}
                        </p>
                      </div>

                      {/* Order Number */}
                      <div className="flex flex-col gap-3">
                        <p className="text-lg md:text-2xl font-medium ">
                          Order #{order.orderNumber}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-base md:text-xl font-light ">
                            View Details
                          </p>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="rotate-[-90deg]"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="#333333"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="p-6 md:p-9 bg-[#F5E6D3]">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-medium"
                          style={{ backgroundColor: statusInfo.color + '20' }}
                        >
                          <span style={{ color: statusInfo.color }}>
                            {order.itemCount}
                          </span>
                        </div>
                        <div>
                          <p className="text-lg md:text-xl font-medium ">
                            {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                          </p>
                          <p
                            className="text-base md:text-lg font-medium"
                            style={{ color: statusInfo.color }}
                          >
                            {statusInfo.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Banner Image */}
      <section className="w-full overflow-hidden">
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[682px]">
          <Image
            src="https://storage.googleapis.com/swaadly-uploads-prod/peanut_butter.png"
            alt="Swaadly Peanut Butter"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>
    </main>
  );
}
