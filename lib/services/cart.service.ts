import { CartItem } from '@/lib/types/cart.types';
import { Product, ProductVariant } from '@/lib/types/product.types';

const CART_STORAGE_KEY = 'swaadly_cart';

export class CartService {
  // Get all cart items from local storage
  static getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];

    try {
      const cartData = localStorage.getItem(CART_STORAGE_KEY);
      if (!cartData) return [];

      const items = JSON.parse(cartData);
      // Convert date strings back to Date objects
      return items.map((item: any) => ({
        ...item,
        addedAt: new Date(item.addedAt),
      }));
    } catch (error) {
      console.error('Error reading cart from local storage:', error);
      return [];
    }
  }

  // Save cart items to local storage
  static saveCartItems(items: CartItem[]): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to local storage:', error);
    }
  }

  // Add item to cart or increment quantity if already exists
  static addToCart(product: Product, variant: ProductVariant, quantity: number = 1): CartItem[] {
    const items = this.getCartItems();

    // Check if item already exists in cart
    const existingItemIndex = items.findIndex(
      (item) => item.product.id === product.id && item.variant.id === variant.id
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `${product.id}-${variant.id}-${Date.now()}`,
        product,
        variant,
        quantity,
        addedAt: new Date(),
      };
      items.push(newItem);
    }

    this.saveCartItems(items);
    return items;
  }

  // Update quantity of a cart item
  static updateQuantity(itemId: string, quantity: number): CartItem[] {
    const items = this.getCartItems();
    const itemIndex = items.findIndex((item) => item.id === itemId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        items.splice(itemIndex, 1);
      } else {
        items[itemIndex].quantity = quantity;
      }
      this.saveCartItems(items);
    }

    return items;
  }

  // Remove item from cart
  static removeItem(itemId: string): CartItem[] {
    const items = this.getCartItems().filter((item) => item.id !== itemId);
    this.saveCartItems(items);
    return items;
  }

  // Clear all items from cart
  static clearCart(): void {
    this.saveCartItems([]);
  }

  // Get total number of items in cart
  static getCartCount(): number {
    const items = this.getCartItems();
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  // Get cart subtotal
  static getCartSubtotal(): number {
    const items = this.getCartItems();
    return items.reduce((total, item) => {
      return total + item.variant.sellingPrice * item.quantity;
    }, 0);
  }
}
