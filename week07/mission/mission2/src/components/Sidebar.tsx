import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../apis/auth";
import { useAuth } from "../context/authContext";
import DeleteModal from "../components/DeleteModal";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: async () => {
      await logout();
      navigate("/login");
    },
  });

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleDeleteConfirm = () => {
    deleteAccountMutation.mutate();
    setShowDeleteModal(false);
  };
  const handleDeleteCancel = () => setShowDeleteModal(false);

  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`z-40 w-64 bg-gray-800 fixed md:relative top-0 left-0 h-full transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <nav className="p-6 flex flex-col gap-4 mt-20 md:mt-0">
          <Link
            to="/"
            className="text-white hover:text-pink-500"
            onClick={onClose}
          >
            찾기
          </Link>
          <Link
            to="/mypage"
            className="text-white hover:text-pink-500"
            onClick={onClose}
          >
            마이페이지
          </Link>
          <button
            onClick={handleDeleteClick}
            className="text-left text-white hover:text-red-500"
          >
            탈퇴하기
          </button>
        </nav>
      </aside>

      {/* 탈퇴 모달 */}
      <DeleteModal
        isOpen={showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLoading={deleteAccountMutation.isPending}
      />
    </>
  );
}
