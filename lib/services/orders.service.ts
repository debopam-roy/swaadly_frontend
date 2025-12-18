import { httpClient } from '../api/http-client';
import type {
  Order,
  OrdersResponse,
  OrderTracking,
  QueryOrdersParams,
} from '../types/order.types';

class OrdersService {
  private readonly basePath = '/orders';

  /**
   * Get all orders for the current user with optional filters and pagination
   */
  async getOrders(params?: QueryOrdersParams): Promise<OrdersResponse> {
    const queryString = params ? this.buildQueryString(params) : '';
    const endpoint = `${this.basePath}${queryString}`;

    return httpClient.get<OrdersResponse>(endpoint, { requiresAuth: true });
  }

  /**
   * Get a single order by ID
   */
  async getOrderById(id: string): Promise<Order> {
    return httpClient.get<Order>(`${this.basePath}/id/${id}`, { requiresAuth: true });
  }

  /**
   * Get a single order by order number
   */
  async getOrderByNumber(orderNumber: string): Promise<Order> {
    return httpClient.get<Order>(`${this.basePath}/number/${orderNumber}`, { requiresAuth: true });
  }

  /**
   * Get order tracking information
   */
  async getOrderTracking(id: string): Promise<OrderTracking> {
    return httpClient.get<OrderTracking>(`${this.basePath}/${id}/tracking`, { requiresAuth: true });
  }

  /**
   * Build query string from params object
   */
  private buildQueryString(params: QueryOrdersParams): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  }
}

export const ordersService = new OrdersService();
