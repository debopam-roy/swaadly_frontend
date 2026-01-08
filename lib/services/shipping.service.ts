import { httpClient } from '../api/http-client';
import type { DeliveryOption, WarehouseConfig } from '../types/shipping.types';

class ShippingService {
  private readonly basePath = '/shipping';
  private warehouseConfig: WarehouseConfig | null = null;

  /**
   * Get the default warehouse configuration from Shipmozo
   * This includes the pickup pincode to be used for rate calculations
   */
  async getWarehouseConfig(): Promise<WarehouseConfig> {
    if (this.warehouseConfig) {
      return this.warehouseConfig;
    }

    const config = await httpClient.get<WarehouseConfig>(`${this.basePath}/warehouse`);
    this.warehouseConfig = config;
    return config;
  }

  /**
   * Get delivery rates/options for a given delivery address
   * Called during checkout when address is selected
   */
  async getDeliveryRates(params: {
    pickupPincode: string;
    deliveryPincode: string;
    weight: number;
    orderAmount: number;
  }): Promise<DeliveryOption[]> {
    return httpClient.post<DeliveryOption[]>(`${this.basePath}/rates`, {
      pickupPincode: params.pickupPincode,
      deliveryPincode: params.deliveryPincode,
      weight: params.weight,
      paymentType: 'PREPAID',
      orderAmount: params.orderAmount,
    });
  }

  /**
   * Check if delivery is available to a pincode
   */
  async checkServiceability(
    pickupPincode: string,
    deliveryPincode: string,
  ): Promise<{ serviceable: boolean }> {
    return httpClient.get<{ serviceable: boolean }>(
      `${this.basePath}/test/serviceability/${pickupPincode}/${deliveryPincode}`,
    );
  }
}

export const shippingService = new ShippingService();
