import { useCounterStore } from "../stores/counterStore";
import type { CounterState } from "../stores/counterStore";

export const RandomNumberGenerator = () => {
  const { randomNumber } = useCounterStore((state): CounterState => state);
  const { random } = useCounterStore((state): CounterState => state).actions;

  return (
    <div>
      <h1 className="text-2xl font-bold">Random Number: {randomNumber}</h1>
      <button
        className="p-3 bg-green-400 rounded-md text-lg font-semibold"
        onClick={random}
      >
        랜덤 번호 생성
      </button>
    </div>
  );
};
