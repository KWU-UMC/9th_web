import ReactDOM from "react-dom";
import useDeleteUser from "../hooks/mutations/useDeleteUser";
import { useNavigate } from "react-router-dom";

type DeleteUserProps = {
  onClose: () => void;
};

const DeleteUserModal = ({ onClose }: DeleteUserProps) => {
  const { mutate: deleteUserMutate } = useDeleteUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await deleteUserMutate();
      onClose();
      alert("회원 탈퇴 성공!");
      navigate("/login")
    } catch {
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-neutral-700 rounded-lg shadow-lg px-25 py-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <div className="text-white text-lg mb-6 text-center">
          정말로 탈퇴하시겠습니까?
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded-md text-white font-semibold hover:bg-red-600"
          >
            예
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 rounded-md text-white font-semibold hover:bg-gray-600"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default DeleteUserModal;
