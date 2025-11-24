import { create } from "zustand";

interface CounterActions {
    increment: () => void;
    decrement: () => void;
    random: () => void;
}

export interface CounterState {
    // values
    count: number;
    randomNumber: number;
    actions: CounterActions;
}

export const useCounterStore = create<CounterState>((set) => ({
    count: 0,
    randomNumber: 0,
    actions: {
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        random: () => set(() => ({ randomNumber: Math.floor(Math.random() * 100) })),
    },
}));


// actions 객체는 한번 정의했기에 -> 함수의 참조가 바뀌지 않아,
// 컴포넌트가 항상 동일한 객체를 바라보기 때문에 렌더링에 문제가 없음