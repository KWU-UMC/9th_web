import { Link } from "react-router-dom";

export default function Navbar() {
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
          <Link
            to="/login"
            className="px-4 py-2 text-white hover:text-pink-400 transition-colors"
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
          >
            회원가입
          </Link>
        </div>
      </div>
    </nav>
  );
}
