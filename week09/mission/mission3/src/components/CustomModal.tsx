import useCartStore from "../zustand/useCartStore";
import useModalState from "../zustand/useModalState";

export default function CustomModal() {
  const { isOpen, closeModal } = useModalState();
  const { clearCart } = useCartStore();

  if (!isOpen) return null;

  const handleClose = () => {
    closeModal();
  };

  const handleClearCart = () => {
    clearCart();
    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg text-center">
        <p className="mb-6">당마두신 모든 음반을 삭제하시겠습니까?</p>
        <button
          onClick={handleClearCart}
          className="mx-10 my-2 px-5 py-2.5 text-base cursor-pointer bg-white rounded-md border-2 border-[rgb(87,80,253)] text-[rgb(87,80,253)] hover:bg-[rgb(87,80,253)] hover:text-white transition-colors"
        >
          네
        </button>
        <button
          onClick={handleClose}
          className="mx-10 my-2 px-5 py-2.5 text-base cursor-pointer bg-white rounded-md border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
        >
          아니요
        </button>
      </div>
    </div>
  );
}
