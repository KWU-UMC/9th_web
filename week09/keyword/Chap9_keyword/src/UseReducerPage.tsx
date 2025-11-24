import { useState } from "react";
import { useReducer } from "react";

// 1. 상태(state) 타입 정의
interface State {
  count: number;
}

// 2. reducer에 대한 interface 정의
type Action =
  | { type: "INCREASE"; payload: number }
  | { type: "DECREASE"; payload: number }
  | { type: "RESET_TO_ZERO" };

const initialState: State = { count: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREASE":
      return {
        ...state,
        count: state.count + action.payload,
      };
    case "DECREASE":
      return {
        ...state,
        count: state.count - action.payload,
      };
    case "RESET_TO_ZERO":
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
}

export const UseReducerPage = () => {
  // 1. useState 훅을 사용하여 상태 관리
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  // 2. useReducer 훅을 사용하여 상태 관리 (미완성)
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-screen">
      <div>
        <h2 className="text-3xl">useState</h2>
        <h1>useState 훅 사용: {count}</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleIncrement}
        >
          Increment
        </button>
      </div>
      <div>
        <h2 className="text-3xl">useReducer</h2>
        <h1>useReducer 훅 사용: {state.count}</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => dispatch({ type: "INCREASE", payload: 3 })}
        >
          Increment
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => dispatch({ type: "DECREASE", payload: 2 })}
        >
          Decrement
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => dispatch({ type: "RESET_TO_ZERO" })}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
