

import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import PriceBox from './components/priceBox';
import ConfirmModal from './components/confirmModal';

const App = () => {
  return (
    <>
      <ConfirmModal />
      <Navbar/>
      <CartList/>
      <PriceBox/>
    </>
  );
};

export default App;