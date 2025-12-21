import { useEffect, useState } from "react";
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

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleDeleteConfirm = () => {
    deleteAccountMutation.mutate();
    setShowDeleteModal(false);
  };
  const handleDeleteCancel = () => setShowDeleteModal(false);

  return (
    <>
      {/* 오버레이 - 열렸을 때만 보임 */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-30  ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* 사이드바 */}
      <aside
        className={`z-40 w-64 bg-gray-800 fixed  top-0 left-0 h-full transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="p-6 flex flex-col gap-4 mt-20 ">
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
