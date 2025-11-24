import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';

// 1. 저장소 생성
function createStore() {
    const store = configureStore({
    // 2. 리듀서 설정
    reducer: {
        cart: cartReducer,
    },
    // middleware, devTools 등 기본값 사용 가능
  });
    return store;
} 

// store를 활용할 수 있도록 내보내야 함
// 여기서 실행해서 스토어를 빼준다.
// 싱글톤 패턴
const store = createStore();

export default store;

// 루트 상태 타입
export type RootState = ReturnType<typeof store.getState>;
// 디스패치 타입
export type AppDispatch = typeof store.dispatch;
