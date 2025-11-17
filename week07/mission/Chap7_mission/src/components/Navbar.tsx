import { NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import useLogout from "../hooks/mutations/useLogout";
import DeleteUserModal from "./DeleteUserModal";

const Navbar = () => {
  const { accessToken } = useAuth();
  const { logout } = useLogout();
  const { data } = useGetMyInfo({
    // 로그인 상태에 따라 자동 fetch
    enabled: !!accessToken,
  });

  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 화면 너비에 따라 기본 사이드바 열림/닫힘 결정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true); // md 이상 → 열림
      } else {
        setIsOpen(false); // md 미만 → 닫힘
      }
    };
    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        if (window.innerWidth < 768) {
          // 모바일 화면에서만 클릭 외부 시 닫기
          setIsOpen(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <div className="relative">
      <div className="bg-neutral-800 fixed top-0 left-0 w-full shadow z-20 ">
        <div className="flex items-center container mx-auto justify-between py-4 ">
          <div className="flex items-center gap-3">
            {/* 햄버거 버튼 */}
            <button
              ref={buttonRef}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen((prev) => !prev);
              }}
              className="text-gray-100 hover:text-gray-400"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <NavLink
              to="/"
              className="text-3xl font-semibold text-gray-100 hover:text-gray-300 transition-colors"
            >
              LP Playlist
            </NavLink>
          </div>

          {/* 로그인/회원가입 or 사용자 정보 */}
          {!accessToken ? (
            <nav className="flex items-center gap-3">
              <NavLink
                to="/login"
                className="p-2 text-lg text-white font-bold hover:text-gray-300"
              >
                로그인
              </NavLink>
              <NavLink
                to="/signup"
                className="p-2 bg-sky-600 rounded-md text-lg text-white font-bold hover:text-gray-300"
              >
                회원가입
              </NavLink>
            </nav>
          ) : (
            <nav className="flex items-center gap-3">
              <span className="text-white font-semibold">
                {data?.name}님 환영합니다.
              </span>
              <button
                onClick={handleLogout}
                className="p-2 text-lg text-white font-bold hover:text-gray-300"
              >
                로그아웃
              </button>
            </nav>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed bg-neutral-800 text-white w-56 top-16 min-h-[calc(100vh-4rem)] z-20 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col justify-between h-[calc(100vh-4rem)] p-4">
          {/* 상단 메뉴 */}
          <div className="overflow-y-auto">
            <div className="text-lg font-bold mb-4">메뉴</div>
            <div className="flex flex-col gap-2">
              <NavLink
                to="/search"
                className="flex items-center gap-3 hover:text-indigo-400 font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                찾기
              </NavLink>

              <NavLink
                to="/my"
                className="flex items-center gap-3 hover:text-indigo-400 font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-white"
                >
                  <path
                    fill="currentColor"
                    d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                  />
                </svg>
                마이페이지
              </NavLink>
            </div>
          </div>

          {/* 하단 탈퇴 버튼 */}
          <button
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <h1 className="bg-red-400 p-2 rounded-md text-gray-300 font-bold cursor-pointer hover:text-white hover:bg-red-600">
              탈퇴하기
            </h1>
          </button>
          {/* 모달 */}
          {isModalOpen && (
            <DeleteUserModal
              onClose={() => {
                setIsModalOpen(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
