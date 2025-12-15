import { Provider } from 'react-redux'

import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import store from "./components/store/store";
import PriceBox from './components/priceBox';

const App = () => {
  return (
    <Provider store={store}>
      <Navbar/>
      <CartList/>
      <PriceBox/>
    </Provider>
  );
};

export default App;