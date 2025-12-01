import useCartStore from '../store/useCartStore'; // 👈 import

const Modal = () => {
  // 👈 액션 가져오기
  const { closeModal, clearCart } = useCartStore();

  return (
    <aside className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-80 p-8 rounded-lg shadow-lg text-center">
        <h4 className="font-bold text-lg mb-4 text-gray-800">
          모든 음반을 장바구니에서<br />삭제하시겠습니까?
        </h4>
        
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="px-6 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 transition font-bold"
            onClick={() => {
              clearCart();  // 👈 dispatch 없이 바로 호출
              closeModal(); // 👈 dispatch 없이 바로 호출
            }}
          >
            네
          </button>
          
          <button
            className="px-6 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition font-bold"
            onClick={closeModal} // 👈 바로 연결 가능
          >
            아니요
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;