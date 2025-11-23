import { useReducer } from "react";

interface State {
  count: number;
}

type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

const initialState: State = { count: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

export function useCountReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
