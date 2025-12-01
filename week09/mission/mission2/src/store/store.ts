import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import modalReducer from '../features/modal/modalSlice'; // 👈 추가!

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer, // 👈 추가!
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;