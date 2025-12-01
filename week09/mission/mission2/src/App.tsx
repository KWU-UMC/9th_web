import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Footer from './components/Footer';
import Modal from './components/Modal'; // 👈 Modal 가져오기
import { useSelector } from 'react-redux'; // 👈 useSelector 가져오기
import { type RootState } from './store/store';

function App() {
  // 👇 Redux에서 isOpen 상태 가져오기
  const { isOpen } = useSelector((store: RootState) => store.modal);

  return (
    <main className="bg-white min-h-screen flex flex-col relative">
      {/* 👇 isOpen이 true일 때만 Modal 보여주기 */}
      {isOpen && <Modal />}
      
      <Navbar />
      <CartContainer />
      <Footer />
    </main>
  );
}

export default App;