export interface RatingDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  weight: number;
  weightUnit: string;
  proteinQuantity?: number;
  mrp: number;
  sellingPrice: number;
  discountPercentage: number;
  stockQuantity: number;
  isAvailable: boolean;
  isDefault: boolean;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: RatingDistribution;
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  deviceType: 'DESKTOP' | 'MOBILE';
  altText?: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface ProductCartImage {
  id: string;
  imageUrl: string;
  deviceType: 'DESKTOP' | 'MOBILE';
  altText?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  flavor?: string;
  brand: string;
  aboutProduct?: string;
  bestWayToEat?: string;
  bestWayToEatImageUrl?: string;
  tags: string[];
  isActive: boolean;
  displayOrder: number;
  averageRating?: number;
  totalReviews?: number;
  variants?: ProductVariant[];
  images?: ProductImage[];
  cartImages?: ProductCartImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductQueryParams {
  search?: string;
  tag?: string;
  isActive?: boolean;
  sortBy?: 'createdAt' | 'name' | 'displayOrder';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
