import { useDispatch } from 'react-redux';
import { closeModal } from '../features/modal/modalSlice';
import { clearCart } from '../features/cart/cartSlice';

const Modal = () => {
  const dispatch = useDispatch();

  return (
    // 1. 배경 오버레이 (화면 전체 덮기 + 반투명 검정)
    <aside className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      
      {/* 2. 모달 박스 */}
      <div className="bg-white w-80 p-8 rounded-lg shadow-lg text-center">
        <h4 className="font-bold text-lg mb-4 text-gray-800">
          모든 음반을 장바구니에서<br />삭제하시겠습니까?
        </h4>
        
        <div className="flex justify-center gap-4 mt-6">
          {/* 3. 네 버튼 (장바구니 비우기 + 모달 닫기) */}
          <button
            className="px-6 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 transition font-bold"
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
          >
            네
          </button>
          
          {/* 4. 아니요 버튼 (모달만 닫기) */}
          <button
            className="px-6 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition font-bold"
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            아니요
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;