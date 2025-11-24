import "./App.css";
// import { UseReducerPage } from "./UseReducerPage";
// import { UseReducerCompany } from "./UseReducerCompany";
import { Counter } from "./components/Counter";
import { RandomNumberGenerator } from "./components/RandomNumberGenerator";

function App() {
  return (
    <div className="flex-col items-center justify-center p-10 space-y-10">
    <Counter />
    <RandomNumberGenerator />
    </div>
  );
}

export default App;