import { Provider } from 'react-redux'

import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import store from "./components/store/store";
import PriceBox from './components/PriceBox';
import Modal from "./components/Modal";

const App = () => {
  return (
    <Provider store={store}>
      <Navbar/>
      <CartList/>
      <PriceBox/>
      <Modal/>
    </Provider>
  );
};

export default App;
