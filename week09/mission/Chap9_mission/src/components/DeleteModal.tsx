import { useCartActions } from "../hooks/useCartStore";
import { useModalActions } from "../hooks/useModalStore";

const DeleteModal = () => {
  const { clearCart } = useCartActions();
  const { closeModal } = useModalActions();

  const handleClearCart = () => {
    // 수량 증가 액션 디스패치
    clearCart();
    closeModal();
  };

  const handleModalClose = () => {
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
      {/* 오버레이 */}
      <div
        aria-hidden="true"
        className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
        onClick={handleModalClose}
      />

      {/* Modal wrapper */}
      <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
        <div className="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">
          {/* X 버튼 */}
          <button
            type="button"
            onClick={handleModalClose}
            className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
          >
            <svg
              className="h-4 w-4 cursor-pointer text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close</span>
          </button>

          {/* Body */}
          <div className="space-y-2 p-2">
            <div className="p-4 space-y-2 text-center dark:text-white">
              <h2 className="text-xl font-bold tracking-tight">
                전체 삭제하기
              </h2>

              <p className="text-gray-500">
                장바구니의 모든 상품을 삭제하시겠습니까?
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="space-y-2">
            <div className="border-t border-gray-200" />

            <div className="px-6 py-2">
              <div className="flex justify-center w-full gap-2">
                {/* Cancel */}
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="w-full inline-flex items-center justify-center py-1 gap-1 font-semibold rounded-lg bg-gray-400 hover:bg-gray-500 cursor-pointer"
                >
                  취소
                </button>

                {/* Confirm */}
                <button
                  type="button"
                  onClick={handleClearCart}
                  className="w-full inline-flex items-center justify-center py-1 gap-1 font-semibold rounded-lg text-white bg-red-600 hover:bg-red-500 cursor-pointer"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
