import { create } from "zustand";
import cartItems from "../constants/cartItems";
import type { CartState, CartItem } from "../types";

interface CartStore extends CartState {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

const useCartStore = create<CartStore>((set) => ({
  // state
  cartItems: cartItems as CartItem[],
  amount: 0,
  total: 0,
  loading: "idle",

  // actions
  increase: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      ),
    })),

  decrease: (id) =>
    set((state) => {
      const item = state.cartItems.find((e) => e.id === id);
      if (item && item.amount === 1) {
        return {
          cartItems: state.cartItems.filter((e) => e.id !== id),
        };
      }
      return {
        cartItems: state.cartItems.map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        ),
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((e) => e.id !== id),
    })),

  clearCart: () =>
    set({
      cartItems: [],
      amount: 0,
      total: 0,
    }),

  calculateTotals: () =>
    set((state) => ({
      amount: state.cartItems.reduce((sum, item) => sum + item.amount, 0),
      total: state.cartItems.reduce(
        (sum, item) => sum + item.amount * parseInt(item.price),
        0
      ),
    })),
}));

export default useCartStore;
