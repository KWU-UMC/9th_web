import CartItem from './CartItem';
import { useEffect } from 'react';
import useCartStore from '../store/useCartStore'; // 👈 import

const CartContainer = () => {
  // 👈 dispatch와 selector가 하나로 합쳐진 형태
  const { cartItems, total, amount, calculateTotals, openModal } = useCartStore();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  if (amount < 1) {
    return (
      <section className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <header className='text-center'>
          <h2 className="text-3xl font-bold mb-2 text-gray-700">장바구니가 비어있습니다</h2>
          <p className="text-gray-400">원하는 음반을 담아보세요.</p>
        </header>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-4 min-h-[70vh] flex flex-col">
      <div className="flex-1">
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>

      <footer className="mt-10 border-t border-gray-300 pt-8">
        <div className="flex justify-between items-center text-xl font-bold mb-8 text-gray-800">
          <h4>총 가격</h4>
          <span>₩ {total.toLocaleString()}</span>
        </div>
        
        <div className="text-center">
          <button
            className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
            onClick={openModal} // 👈 () => dispatch(openModal()) 에서 openModal로 간소화
          >
            전체 삭제
          </button>
        </div>
      </footer>
    </section>
  );
};

export default CartContainer;