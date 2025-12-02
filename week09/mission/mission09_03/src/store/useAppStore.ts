import { create } from "zustand";
import cartItems from "../constants/cartItem";
import type { CartItems } from "../types/cart";

type IdPayload = { id: string };

interface AppState {
  cartItems: CartItems;
  amount: number;
  total: number;
  isOpen: boolean;
  increase: (payload: IdPayload) => void;
  decrease: (payload: IdPayload) => void;
  removeItem: (payload: IdPayload) => void;
  clearCart: () => void;
  calculateTotal: () => void;
  openModal: () => void;
  closeModal: () => void;
}

const computeTotals = (items: CartItems) => {
  let amount = 0;
  let total = 0;
  items.forEach((item) => {
    amount += item.amount;
    total += item.amount * Number(item.price);
  });
  return { amount, total };
};

const initialTotals = computeTotals(cartItems);

const useAppStore = create<AppState>((set) => ({
  cartItems,
  amount: initialTotals.amount,
  total: initialTotals.total,
  isOpen: false,
  increase: ({ id }) =>
    set((state) => {
      const updated = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      const totals = computeTotals(updated);
      return { ...state, cartItems: updated, ...totals };
    }),
  decrease: ({ id }) =>
    set((state) => {
      const updated = state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0);
      const totals = computeTotals(updated);
      return { ...state, cartItems: updated, ...totals };
    }),
  removeItem: ({ id }) =>
    set((state) => {
      const updated = state.cartItems.filter((item) => item.id !== id);
      const totals = computeTotals(updated);
      return { ...state, cartItems: updated, ...totals };
    }),
  clearCart: () =>
    set((state) => ({
      ...state,
      cartItems: [],
      amount: 0,
      total: 0,
    })),
  calculateTotal: () =>
    set((state) => {
      const totals = computeTotals(state.cartItems);
      return { ...state, ...totals };
    }),
  openModal: () => set((state) => ({ ...state, isOpen: true })),
  closeModal: () => set((state) => ({ ...state, isOpen: false })),
}));

export default useAppStore;
