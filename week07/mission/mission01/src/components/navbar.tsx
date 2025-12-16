import { Bars3Icon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyInfo } from "../apis/auth";

type Props = {
  onToggleSidebar?: () => void;
};

const Navbar = ({ onToggleSidebar }: Props) => {
  const { isAuthenticated, logout } = useAuth();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!isAuthenticated) return setName(null);
      try {
        const res = await getMyInfo();
        setName(res?.data?.name ?? null);
      } catch {
        setName(null);
      }
    };
    run();
  }, [isAuthenticated]);

  return (
    <nav className="flex justify-between items-center h-14 px-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
          className="p-2 rounded hover:bg-gray-100"
        >
          <Bars3Icon className="w-6 h-6 text-gray-700" />
        </button>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-black font-bold" : "text-gray-500"
          }
        >
          홈
        </NavLink>
      </div>

      <div className="flex gap-4 items-center">
        {isAuthenticated && name ? (
          <>
            <span className="font-semibold whitespace-nowrap hidden sm:inline">
              {name}님 환영합니다.
            </span>
            <button onClick={logout} className="text-gray-600 hover:text-black">
              로그아웃
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) =>
              isActive ? "text-black font-bold" : "text-gray-500"
            }>
              로그인
            </NavLink>
            <NavLink to="/sign" className={({ isActive }) =>
              isActive ? "text-black font-bold" : "text-gray-500"
            }>
              회원가입
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
