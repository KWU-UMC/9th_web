import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Footer from './components/Footer';

function App() {
  return (
    <main className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <CartContainer />
      <Footer />
    </main>
  );
}

export default App;