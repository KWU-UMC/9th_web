import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
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
        className={`
          z-40
          w-64 bg-gray-800
          fixed md:relative
          top-0 left-0 h-full
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <nav className="p-6 flex flex-col gap-4 mt-20 md:mt-0">
          <Link
            to="/lps"
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
        </nav>
      </aside>
    </>
  );
}
