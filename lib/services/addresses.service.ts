import { httpClient } from '../api/http-client';
import type {
  Address,
  CreateAddressRequest,
  UpdateAddressRequest,
  AddressesResponse,
  AddressResponse,
  CreateAddressResponse,
  UpdateAddressResponse,
  DeleteAddressResponse,
  SetDefaultAddressResponse,
} from '../types/address.types';

class AddressesService {
  /**
   * Get all addresses for current user
   */
  async getAll(): Promise<Address[]> {
    const response = await httpClient.get<AddressesResponse>('/addresses', {
      requiresAuth: true,
    });
    return response.addresses;
  }

  /**
   * Get a specific address by ID
   */
  async getById(id: string): Promise<Address> {
    const response = await httpClient.get<AddressResponse>(`/addresses/${id}`, {
      requiresAuth: true,
    });
    return response.address;
  }

  /**
   * Get user's default address
   */
  async getDefault(): Promise<Address | null> {
    const response = await httpClient.get<AddressResponse>(
      '/addresses/default/address',
      { requiresAuth: true }
    );
    return response.address;
  }

  /**
   * Create a new address
   */
  async create(data: CreateAddressRequest): Promise<CreateAddressResponse> {
    return httpClient.post<CreateAddressResponse>('/addresses', data, {
      requiresAuth: true,
    });
  }

  /**
   * Update an existing address
   */
  async update(
    id: string,
    data: UpdateAddressRequest
  ): Promise<UpdateAddressResponse> {
    return httpClient.put<UpdateAddressResponse>(`/addresses/${id}`, data, {
      requiresAuth: true,
    });
  }

  /**
   * Set an address as default
   */
  async setAsDefault(id: string): Promise<SetDefaultAddressResponse> {
    return httpClient.put<SetDefaultAddressResponse>(
      `/addresses/${id}/set-default`,
      {},
      { requiresAuth: true }
    );
  }

  /**
   * Delete an address
   */
  async delete(id: string): Promise<DeleteAddressResponse> {
    return httpClient.delete<DeleteAddressResponse>(`/addresses/${id}`, {
      requiresAuth: true,
    });
  }
}

export const addressesService = new AddressesService();
