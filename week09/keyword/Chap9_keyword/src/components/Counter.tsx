import { useCounterStore } from "../stores/counterStore";
import { useShallow } from "zustand/shallow";

export const Counter = () => {
  // 개별 구독 방법
  //   const count = useCounterStore((state) => state.count);
  //   const increment = useCounterStore((state) => state.increment);
  //   const decrement = useCounterStore((state) => state.decrement);

  // 객체 구조 분해 할당 + 얕은 비교(useShallow)를 통한 구독 방법
  const { count, increment, decrement } = useCounterStore(
    useShallow((state) => ({
      count: state.count,
      increment: state.actions.increment,
      decrement: state.actions.decrement,
    }))
  );

  return (
    <div>
      <h1 className="text-2xl font-bold">Count: {count}</h1>
      <button
        className="p-3 mr-4 bg-amber-400 rounded-md text-lg font-semibold"
        onClick={increment}
      >
        증가
      </button>
      <button
        className="p-3 bg-blue-500 rounded-md text-lg font-semibold"
        onClick={decrement}
      >
        감소
      </button>
    </div>
  );
};
