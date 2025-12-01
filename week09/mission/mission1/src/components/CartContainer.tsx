import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store/store';
import CartItem from './CartItem';
import { calculateTotals, clearCart } from '../features/cart/cartSlice';
import { useEffect } from 'react';

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, total, amount } = useSelector((store: RootState) => store.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

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
      {/* 제목 부분 (사진에는 없지만 필요한 경우 유지, 심플하게 처리) */}
      <header className="mb-8 hidden">
        <h2 className="text-2xl font-bold text-gray-800">장바구니</h2>
      </header>
      
      {/* 리스트 영역 */}
      <div className="flex-1">
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>

      {/* 하단 총액 및 전체 삭제 영역 */}
      <footer className="mt-10 border-t border-gray-300 pt-8">
        <div className="flex justify-between items-center text-xl font-bold mb-8 text-gray-800">
          <h4>총 가격</h4>
          <span>₩ {total.toLocaleString()}</span>
        </div>
        
        {/* 사진 속 버튼 디자인 반영: 흰색 배경, 회색 테두리 */}
        <div className="text-center">
          <button
            className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
            onClick={() => dispatch(clearCart())}
          >
            전체 삭제
          </button>
        </div>
      </footer>
    </section>
  );
};

export default CartContainer;