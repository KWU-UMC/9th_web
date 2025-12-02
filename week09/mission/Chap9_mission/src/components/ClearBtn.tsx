import DeleteModal from "./DeleteModal";
import { useModalActions } from "../hooks/useModalStore";
import { useModalInfo } from "../hooks/useModalStore";

export const ClearBtn = () => {
  const { isOpen } = useModalInfo();
  const { openModal } = useModalActions();

  const handleModalOpen = () => {
    openModal();
  };

  return (
    <>
      <button
        className="mt-6 w-full bg-red-100 text-white py-3 rounded-md font-semibold hover:bg-red-600 transition-colors"
        onClick={handleModalOpen}
      >
        전체 삭제하기
      </button>
      {/* 모달 표시 */}
      {isOpen && (
        <DeleteModal/>
      )}
    </>
  );
};
