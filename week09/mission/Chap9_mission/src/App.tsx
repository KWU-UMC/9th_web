import "./App.css";
import { CartList } from "./components/CartList";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <CartList />
    </div>
  );
}

export default App;