import useAppStore from "../store/useAppStore";

const Modal = () => {
  const { isOpen, clearCart, closeModal } = useAppStore();

  if (!isOpen) return null;

  const handleCancel = () => closeModal();

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-80 rounded-md bg-white p-6 shadow-lg">
        <p className="mb-4 text-center text-lg font-semibold">
          정말 삭제하시겠습니까?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 transition-colors cursor-pointer"
          >
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className="rounded-md bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700 transition-colors cursor-pointer"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
