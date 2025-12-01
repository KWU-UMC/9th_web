import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Footer from './components/Footer';
import Modal from './components/Modal';
import useCartStore from './store/useCartStore'; // 👈 Zustand Store import

function App() {
  // 👈 기존 useSelector 대신 사용
  const { isOpen } = useCartStore();

  return (
    <main className="bg-white min-h-screen flex flex-col relative">
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
      <Footer />
    </main>
  );
}

export default App;