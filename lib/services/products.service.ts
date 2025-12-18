import { httpClient } from '../api/http-client';
import type { Product, ProductsResponse, ProductQueryParams } from '../types/product.types';

class ProductsService {
  private readonly basePath = '/products';

  /**
   * Get all products with optional filters and pagination
   */
  async getProducts(params?: ProductQueryParams): Promise<ProductsResponse> {
    const queryString = params ? this.buildQueryString(params) : '';
    const endpoint = `${this.basePath}${queryString}`;

    return httpClient.get<ProductsResponse>(endpoint);
  }

  /**
   * Get a single product by ID
   */
  async getProductById(id: string): Promise<Product> {
    return httpClient.get<Product>(`${this.basePath}/id/${id}`);
  }

  /**
   * Get a single product by slug
   */
  async getProductBySlug(slug: string): Promise<Product> {
    return httpClient.get<Product>(`${this.basePath}/${slug}`);
  }

  /**
   * Build query string from params object
   */
  private buildQueryString(params: ProductQueryParams): string {
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

export const productsService = new ProductsService();
