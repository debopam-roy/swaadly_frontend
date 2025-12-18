export interface ProductVariant {
  id: string;
  sku: string;
  weight: number;
  weightUnit: string;
  mrp: number;
  sellingPrice: number;
  discountPercentage: number;
  couponCode?: string;
  couponAppliedPrice?: number;
  stockQuantity: number;
  isAvailable: boolean;
  isDefault: boolean;
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  thumbnailUrl?: string;
  altText?: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  shortDescription?: string;
  longDescription?: string;
  productType?: string;
  tags: string[];
  proteinPer100g?: number;
  caloriesPer100g?: number;
  nutritionalInfo?: any;
  features?: any;
  usageInstructions?: string;
  isActive: boolean;
  isFeatured: boolean;
  totalSales: number;
  totalReviews: number;
  averageRating: number;
  viewCount: number;
  displayOrder: number;
  variants?: ProductVariant[];
  images?: ProductImage[];
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
  productType?: string;
  tag?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  sortBy?: 'createdAt' | 'name' | 'price' | 'averageRating' | 'totalSales' | 'displayOrder';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
