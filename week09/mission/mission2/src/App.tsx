import { Provider } from 'react-redux'

import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import store from "./components/store/store";
import PriceBox from './components/priceBox';
import ConfirmModal from './components/confirmModal';

const App = () => {
  return (
    <Provider store={store}>
      <ConfirmModal />
      <Navbar/>
      <CartList/>
      <PriceBox/>
    </Provider>
  );
};

export default App;