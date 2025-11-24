import { NavLink } from "react-router-dom";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import useLogout from "../hooks/mutations/useLogout";
import { useAuth } from "../hooks/useAuth";
import HamburgerButton from "./HamburgerButton";
import type { RefObject } from "react";

type NavbarProps = {
  onToggleSidebar: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
};

const Navbar = ({ onToggleSidebar, buttonRef }: NavbarProps) => {
  const { accessToken } = useAuth();
  const { logout } = useLogout();

  const { data } = useGetMyInfo({
    enabled: !!accessToken,
  });

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      alert("로그아웃 실패");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full shadow z-50 bg-neutral-800">
      <div className="flex items-center container mx-auto justify-between py-4">
        <div className="flex items-center gap-3">
          <HamburgerButton ref={buttonRef} onClick={onToggleSidebar} />

          <NavLink
            to="/"
            className="text-3xl font-semibold text-gray-100 hover:text-blue-300"
          >
            LP Playlist
          </NavLink>
        </div>

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
  );
};

export default Navbar;