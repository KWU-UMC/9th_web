import { create } from 'zustand';
import cartItems, { type CartItemType } from '../constants/cartItems';

// 1. 상태와 액션의 타입 정의
interface CartState {
  // --- 장바구니 상태 ---
  cartItems: CartItemType[];
  amount: number;
  total: number;
  
  // --- 모달 상태 ---
  isOpen: boolean;

  // --- 액션 (함수들) ---
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  openModal: () => void;
  closeModal: () => void;
}

// 2. 스토어 생성
const useCartStore = create<CartState>((set) => ({
  // --- 초기값 설정 ---
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isOpen: false,

  // --- 액션 구현 (Redux Reducer 로직을 set 함수로 변환) ---
  
  // 수량 증가
  increase: (id) => set((state) => {
    const newCartItems = state.cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    return { cartItems: newCartItems };
  }),

  // 수량 감소
  decrease: (id) => set((state) => {
    const newCartItems = state.cartItems
      .map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      })
      .filter((item) => item.amount > 0); // 1보다 작으면 삭제 로직 포함

    return { cartItems: newCartItems };
  }),

  // 아이템 개별 삭제
  removeItem: (id) => set((state) => ({
    cartItems: state.cartItems.filter((item) => item.id !== id),
  })),

  // 장바구니 전체 비우기
  clearCart: () => set(() => ({
    cartItems: [],
  })),

  // 총액 및 수량 계산
  calculateTotals: () => set((state) => {
    let amount = 0;
    let total = 0;
    state.cartItems.forEach((item) => {
      amount += item.amount;
      total += item.amount * parseInt(item.price);
    });
    return { amount, total };
  }),

  // 모달 열기
  openModal: () => set(() => ({ isOpen: true })),

  // 모달 닫기
  closeModal: () => set(() => ({ isOpen: false })),
}));

export default useCartStore;