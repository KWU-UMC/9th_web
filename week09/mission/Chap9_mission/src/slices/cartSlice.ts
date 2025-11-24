import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItems'
import type { CartItems } from '../types/cart'

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

/*
- [ ]  초기 상태에 다음 값을 포함해주세요:
    - `cartItems`: Mock 데이터
    - `amount`: 전체 수량
    - `total`: 전체 금액
- [ ]  초기 렌더링 시 `amount`와 `total`이 자동 계산되도록 구성해주세요.
*/
const initialState: CartState = { 
    cartItems: cartItems,
    amount: 0,
    total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment(state, action: PayloadAction<{id: string}>) {
        // 1. **수량 증가 (`increase`)**
        // - 특정 음반의 `amount`를 +1 시키는 기능을 만들어주세요.
        // - `payload`로 전달된 `id`를 가진 아이템만 증가시키도록 구현해주세요.

        // any가 아닌 확정적 타입으로 id 가져오기
        const itemId = action.payload.id;

        // 해당 아이템 찾기
        const item = state.cartItems.find((lp) => lp.id === itemId);

        // 수량 증가
        if (item) {
            item.amount++;
        }
    },
    decrement(state, action: PayloadAction<{id: string}>) {
        // 2. 수량 감소 (`decrease`)
        // - 특정 음반의 `amount`를 -1 시키는 기능을 만들어주세요.
        // - 감소 결과가 1보다 작아지면 해당 아이템을 자동으로 제거해주세요.

        // `payload`로 전달된 `id`를 가진 아이템만 감소시키도록 구현
        const itemId = action.payload.id;
        
        // 해당 아이템 찾기
        const item = state.cartItems.find((lp) => lp.id === itemId);

        // 수량 감소 및 조건에 따른 제거
        if (item) {
            item.amount--;
            if (item.amount < 1) {
                state.cartItems = state.cartItems.filter((lp) => lp.id !== itemId);
            }
        }
    },
    removeItem(state, action: PayloadAction<{id: string}>) {
        // 3. 아이템 제거 (`removeItem`): 특정 음반을 장바구니에서 완전히 제거하는 기능
        // - `payload`로 전달된 `id`를 가진 아이템만 제거
        const itemId = action.payload.id;
        state.cartItems = state.cartItems.filter((lp) => lp.id !== itemId);
    },
    clearCart(state) {
        // 4. 전체 삭제 (`clearCart`)
        // - 장바구니의 모든 데이터를 전부 삭제하는 기능을 만들어주세요.
        // - 삭제 후, 수량과 금액도 0이 되도록 해주세요.

        // 장바구니 비우기
        state.cartItems = []

        // 수량 및 금액 초기화
        state.amount=0
        state.total=0
    },
    calculateTotals(state) {
        // 5. 전체 합계 계산 (`calculateTotals`)
        // - 장바구니 전체 수량(`amount`)과 총 금액(`total`)을 계산하는 기능을 만들어주세요.
        // - 수량 증가/감소/삭제 등의 변화가 있을 때 자동으로 호출되도록 구성해주세요.
        
        // 초기값 설정
        let totalAmount = 0;
        let totalPrice = 0;

        // 장바구니 아이템들을 순회하며 총 수량과 총 금액 계산
        state.cartItems.forEach((item) => {
            totalAmount += item.amount;
            totalPrice += item.amount * item.price;
        });

        // 상태 업데이트
        state.amount = totalAmount;
        state.total = totalPrice;
    },
  },
})

// 액션 생성자 내보내기
export const { increment, decrement, removeItem, clearCart, calculateTotals } = cartSlice.actions

// duck pattern reducer는 export default로 내보내야함.
const cartReducer = cartSlice.reducer;

export default cartReducer;