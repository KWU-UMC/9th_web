import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Navbar() {
  const { logout } = useAuth();
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* 로고 & 메뉴 */}
        <div className="flex gap-6 items-center">
          <Link to="/" className="text-pink-500 text-2xl font-bold">
            홈
          </Link>
        </div>

        {/* 로그인/회원가입 버튼 */}
        <div className="flex gap-3">
          <Link to="/login" className="px-4 py-2 text-white">
            로그인
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-pink-600 text-white rounded-lg "
          >
            회원가입
          </Link>
          <button
            className="px-4 py-2 bg-amber-200 text-white rounded-lg "
            onClick={logout}
          >
            로그 아웃
          </button>
        </div>
      </div>
    </nav>
  );
}
