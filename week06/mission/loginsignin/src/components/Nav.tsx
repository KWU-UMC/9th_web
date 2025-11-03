import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

type NavProps ={
  onMenuClick?: () => void;
};

const Nav = ({onMenuClick}: NavProps) => {
  const {accessToken, name} = useAuth();
  const {logout} = useAuth();

  const handleLogout = async ():Promise<void> => {
    await logout();
  }

  return (
    <nav className="bg-gray-900 flex items-center justify-between p-2 fixed w-full z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="text-white"
        >
          <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M7.95 11.95h32m-32 12h32m-32 12h32"/>
          </svg>
        </button>
        <Link 
          to="/"
          className="text-pink-500 text-xl"
        >홈</Link>
      </div>
      <div className="flex items-center gap-5">
        {!accessToken && (
          <>
            <Link 
              to="/login"
              className="text-white"
            >로그인</Link>
            <Link 
              to="/signup"
              className="text-white bg-pink-500 p-2 rounded-md"
            >회원가입</Link>
          </>
        )}
        {accessToken && (
          <>
            <h1 className="text-white p-2">
              {name}님 반갑습니다.
            </h1>
            <button 
              onClick={() => handleLogout()}
              className="text-white"
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
