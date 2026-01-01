export enum AddressType {
  HOME = 'HOME',
  WORK = 'WORK',
  OTHER = 'OTHER',
}

export interface Address {
  id: string;
  userId: string;
  addressType: AddressType;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressRequest {
  addressType?: AddressType;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
}

export interface UpdateAddressRequest extends Partial<CreateAddressRequest> {}

export interface AddressesResponse {
  addresses: Address[];
}

export interface AddressResponse {
  address: Address;
}

export interface CreateAddressResponse {
  message: string;
  address: Address;
}

export interface UpdateAddressResponse {
  message: string;
  address: Address;
}

export interface DeleteAddressResponse {
  message: string;
}

export interface SetDefaultAddressResponse {
  message: string;
  address: Address;
}
