import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";

const Modal = () => {
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen) {
    return null;
  }

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-80 rounded-md bg-white p-6 shadow-lg">
        <p className="mb-4 text-center text-lg font-semibold">
          {"\uC815\uB9D0 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?"}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 transition-colors cursor-pointer"
          >
            {"\uC544\uB2C8\uC694"}
          </button>
          <button
            onClick={handleConfirm}
            className="rounded-md bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700 transition-colors cursor-pointer"
          >
            {"\uB124"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
