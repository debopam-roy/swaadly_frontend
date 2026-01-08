/**
 * Delivery option returned from shipping rates API
 */
export interface DeliveryOption {
  id: string;
  name: string;
  courierName: string;
  deliveryTime: string;
  price: number;
  recommended: boolean;
}

/**
 * Request params for fetching delivery rates
 */
export interface DeliveryRatesRequest {
  pickupPincode: string;
  deliveryPincode: string;
  weight: number;
  orderAmount: number;
}

/**
 * Warehouse configuration returned from API
 */
export interface WarehouseConfig {
  pincode: string;
  name: string;
  city: string;
  state: string;
}
