'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '@/lib/types/cart.types';
import { Product, ProductVariant } from '@/lib/types/product.types';
import { CartService } from '@/lib/services/cart.service';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  // Load cart from local storage on mount
  useEffect(() => {
    refreshCart();
  }, []);

  // Update derived state when items change
  useEffect(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const total = items.reduce(
      (sum, item) => sum + item.variant.sellingPrice * item.quantity,
      0
    );
    setItemCount(count);
    setSubtotal(total);
  }, [items]);

  const refreshCart = () => {
    const cartItems = CartService.getCartItems();
    setItems(cartItems);
  };

  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    const updatedItems = CartService.addToCart(product, variant, quantity);
    setItems(updatedItems);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    const updatedItems = CartService.updateQuantity(itemId, quantity);
    setItems(updatedItems);
  };

  const removeItem = (itemId: string) => {
    const updatedItems = CartService.removeItem(itemId);
    setItems(updatedItems);
  };

  const clearCart = () => {
    CartService.clearCart();
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
