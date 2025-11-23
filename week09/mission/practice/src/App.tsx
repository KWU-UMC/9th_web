import "./App.css";
import { useCountReducer } from "./useCountReducer/useCountReducer";
function App() {
  const { state, dispatch } = useCountReducer();

  return (
    <div>
      <button onClick={() => dispatch({ type: "increment" })}>+1</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
      <p>{state.count}</p>
    </div>
  );
}

export default App;
