import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import type { CartState } from "../types";

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
  loading: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((e) => e.id === action.payload);
      if (item) {
        item.amount += 1;
      }
    },
    decrease: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((e) => e.id === action.payload);
      if (item && item.amount > 1) {
        item.amount -= 1;
      } else if (item && item.amount === 1) {
        state.cartItems = state.cartItems.filter(
          (e) => e.id !== action.payload
        );
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((e) => e.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    calculateTotals: (state) => {
      state.amount = state.cartItems.reduce(
        (sum, item) => sum + item.amount,
        0
      );
      state.total = state.cartItems.reduce(
        (sum, item) => sum + item.amount * item.price,
        0
      );
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
