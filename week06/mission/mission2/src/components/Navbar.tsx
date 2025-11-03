import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const BurgerMark = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M7.95 11.95h32m-32 12h32m-32 12h32"
      />
    </svg>
  );
};

interface NavbarProps {
  handleToggle: () => void;
}

export default function Navbar({ handleToggle }: NavbarProps) {
  const { accessToken, refreshToken, logout, name } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 z-100">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex gap-4 justify-center items-center">
          <button onClick={handleToggle} className=" text-white">
            <BurgerMark />
          </button>
          <Link to="/" className="text-pink-500 text-2xl font-bold">
            홈
          </Link>
        </div>

        {accessToken && refreshToken ? (
          <div className="flex gap-3 items-center">
            <span className="text-white">{name}님 반갑습니다.</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-white hover:text-pink-500"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              회원가입
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
