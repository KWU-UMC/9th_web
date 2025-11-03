import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Navbar() {
  const { logout, accessToken } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
        {/* 로고 & 메뉴 */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-pink-500">
            홈
          </Link>
          {/*  */}
          <Link to="/me" className="text-sm text-gray-200 hover:underline">
            My Page
          </Link>
        </div>

        {/* 우측 버튼 */}
        <div className="flex gap-3">
          {accessToken ? (
            <button
              className="rounded-lg bg-pink-600 px-4 py-2 text-white"
              onClick={logout}
            >
              로그아웃
            </button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-white">
                로그인
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-pink-600 px-4 py-2 text-white"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
