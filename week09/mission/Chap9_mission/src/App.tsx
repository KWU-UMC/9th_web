import "./App.css";
import { Provider } from "react-redux";
import { CartList } from "./components/CartList";
import { Navbar } from "./components/Navbar";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <CartList />
    </Provider>
  );
}

export default App;