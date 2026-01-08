export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
}

export enum DeliveryType {
  STANDARD = 'STANDARD',
  EXPRESS = 'EXPRESS',
  SAME_DAY = 'SAME_DAY',
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  productImageUrl?: string;
  variantId: string;
  variantSku: string;
  variantWeight: number;
  variantWeightUnit: string;
  quantity: number;
  unitPrice: number;
  unitMrp: number;
  discountPerUnit: number;
  totalPrice: number;
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;

  // Pricing
  subtotal: number;
  discountAmount: number;
  couponDiscount: number;
  couponCode?: string;
  taxAmount: number;
  deliveryFee: number;
  totalAmount: number;

  // Delivery
  deliveryType: DeliveryType;
  shippingAddress: ShippingAddress;

  // Customer
  customerName: string;
  customerEmail: string;
  customerPhone: string;

  // Tracking
  externalOrderId?: string;
  trackingNumber?: string;
  courierName?: string;
  estimatedDelivery?: string;

  // Timestamps
  createdAt: string;
  confirmedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;

  // Cancellation
  cancellationReason?: string;
  cancelledBy?: string;

  // Items
  items: OrderItem[];

  // Notes
  orderNotes?: string;
  deliveryNotes?: string;
}

export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  itemCount: number;
  createdAt: string;
  estimatedDelivery?: string;
}

export interface OrdersResponse {
  orders: OrderSummary[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OrderTracking {
  orderNumber: string;
  status: OrderStatus;
  trackingNumber?: string;
  courierName?: string;
  externalOrderId?: string;
  estimatedDelivery?: string;
  confirmedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
}

export interface QueryOrdersParams {
  status?: OrderStatus;
  search?: string;
  sortBy?: 'createdAt' | 'orderNumber' | 'totalAmount' | 'status';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * Cart item for order creation
 */
export interface OrderItemRequest {
  productId: string;
  variantId: string;
  quantity: number;
}

/**
 * Request payload for creating a new order
 */
export interface CreateOrderRequest {
  addressId: string;
  items: OrderItemRequest[];
  couponCode?: string;
  deliveryOptionId?: string;
  orderNotes?: string;
  deliveryNotes?: string;
}
