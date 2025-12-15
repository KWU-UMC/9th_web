import { create } from 'zustand';

interface CounterState {
    count: number;
    increment: () => void;
    decrement: () => void;
    randomNumber: number;
    random: () => void;
}

export const useCounterStore = create<CounterState>((set)=>({
    count:0,
    randomNumber: 0,
    increment: () =>{
        set((state) => ({
            count: state.count + 1,
        }))
    },
    decrement: () =>{
        set((state) => ({
            count: state.count + 1,
        }))
    },
    random: () =>{
        set(() => ({
            randomNumber: Math.floor(Math.random() * 100),
        }))
    },
}))