import "./App.css";
//import { UseCallbackPage } from "./UseCallbackPage";
import { UseMemoPage } from "./UseMemoPage";

function App() {
  return (
    <div className="flex-col items-center justify-center p-10 space-y-10">
      <UseMemoPage />
    </div>
  );
}

export default App;