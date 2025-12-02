import type { CartItems } from '../types/cart'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer';
import cartItems from '../constants/cartItems'
import { useShallow } from "zustand/shallow";

interface CartAction {
    increase: (id: string) => void;
    decrease: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    calculateTotals: () => void;
}

interface CartState {
    cartItems: CartItems;
    amount: number;
    total: number;

    actions: CartAction;
}

export const useCartStore = create<CartState>()(
  immer((set, ) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id: string): void => {
        set((state) => {
          const item = state.cartItems.find((lp) => lp.id === id);

          if (item) {
            item.amount++;
          }
        });
      },
      decrease: (id: string): void => {
        set((state) => {
            const item = state.cartItems.find((lp) => lp.id === id);
            
            if (item) {
                item.amount--;
                if (item.amount < 1) {
                    state.cartItems = state.cartItems.filter((lp) => lp.id !== id);
                }
            }
        });
      },
      removeItem: (id: string): void => {
        set((state) => {
          state.cartItems = state.cartItems.filter((lp) => lp.id !== id);
        });
      },
      clearCart: (): void => {
        set((state) => {
          state.cartItems = [];
          state.amount = 0;
          state.total = 0;
        });
      },
      calculateTotals: (): void => {
        set((state) => {
            let totalAmount = 0;
            let totalPrice = 0;
            
            state.cartItems.forEach((item) => {
                totalAmount += item.amount;
                totalPrice += item.amount * item.price;
            });
            
            state.amount = totalAmount;
            state.total = totalPrice;
        });
      },
    },
  }))
);

export const useCartInfo = () => useCartStore(
    useShallow((state) => ({
        cartItems: state.cartItems,
        amount: state.amount,
        total: state.total,
    }))
);

export const useCartActions = () => useCartStore((state) => state.actions);