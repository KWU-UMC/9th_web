// src/components/Layout.tsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const navClass = ({ isActive }: { isActive: boolean }) =>
  [
    "px-3 py-2 rounded-lg text-sm font-medium transition",
    isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100",
  ].join(" ");

export default function Layout() {
  const navigate = useNavigate();
  const { isAuthed, logout } = useAuth();

  const handleLogout = () => {
    logout();                    // 컨텍스트/스토리지 정리
    navigate("/login", { replace: true });
  };

  const goHome = () => navigate("/", { replace: true });

  return (
    <div className="mx-auto max-w-7xl px-5 min-h-dvh flex flex-col">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex items-center justify-between py-4 gap-4">
          {/* 로고/브랜드 */}
          <button
            type="button"
            onClick={goHome}
            className="text-pink-500 font-extrabold text-lg tracking-tight"
            aria-label="홈으로 이동"
          >
            듀의 영화 찾기
          </button>

          {/* 네비게이션 */}
          {isAuthed && (
            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/" className={navClass} end>
                홈
              </NavLink>
              <NavLink to="/popular" className={navClass}>
                인기 영화
              </NavLink>
              <NavLink to="/upcoming" className={navClass}>
                개봉 예정
              </NavLink>
              <NavLink to="/top-rated" className={navClass}>
                평점 높은
              </NavLink>
              <NavLink to="/now-playing" className={navClass}>
                상영 중
              </NavLink>
            </nav>
          )}

          {/* 우측 액션 */}
          <div className="flex items-center gap-2">
            {isAuthed ? (
              <button
                onClick={handleLogout}
                className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100"
              >
                로그아웃
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100"
                >
                  로그인
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="rounded-md bg-pink-500 px-3 py-1.5 text-sm text-white hover:bg-pink-600"
                >
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 페이지 컨텐츠 */}
      <main className="flex-1 py-6">
        <Outlet />
      </main>
    </div>
  );
}
