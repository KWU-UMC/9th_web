import { useCartActions } from "../hooks/useCartStore";
import { useModalStore } from "../hooks/useModalStore";

const ConfirmModal = () => {
    const { isOpen } = useModalStore();
    const { clearCart } = useCartActions();
    const { closeModal } = useModalStore();

    if (!isOpen) return null;

    const handleConfirm = () => {
        clearCart();
        closeModal();
    };

    const handleCancel = () => {
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center backdrop-blur-sm">
            <div className="bg-white p-8 rounded-lg shadow-xl w-60">
                <p className="text-center mb-6">정말 삭제하시겠습니까?</p>

                <div className="flex justify-between">
                    <button 
                        onClick={handleCancel}
                        className="border px-4 py-2 rounded-md"
                    >
                        아니오
                    </button>

                    <button 
                        onClick={handleConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                        예
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
