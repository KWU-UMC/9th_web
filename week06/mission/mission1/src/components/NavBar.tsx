import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import type { ResponseMyInfoDto } from '../types/auth';
import { getMyInfo } from '../apis/auth';

const Navbar = () => {
  const { accessToken, logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!accessToken) return;
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
      } catch (error) {
        console.error("getMyInfo 실패:", error);
      }
    };
    getData();
  }, [accessToken]);

  const handleFocusSearch = () => {
    setIsSidebarOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const event = new Event("focusSearchInput");
        window.dispatchEvent(event);
      }, 50);
    } else {
      const event = new Event("focusSearchInput");
      window.dispatchEvent(event);
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-950 text-white shadow-lg transform transition-transform duration-300 z-50
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 
        `}
      >
        <div className="p-6 flex flex-col gap-6">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="self-end text-gray-300 hover:text-white md:hidden"
          >
            ✕
          </button>

          <button
            onClick={handleFocusSearch}
            className="hover:text-blue-300 transition-colors text-left"
          >
            🔍 찾기
          </button>

          {accessToken && (
            <Link
              to="/my"
              onClick={() => setIsSidebarOpen(false)}
              className="hover:text-blue-300 transition-colors"
            >
              👤 마이페이지
            </Link>
          )}
        </div>
      </div>

      <nav className="bg-blue-900 text-white relative ml-0 md:ml-64 transition-all">
        <div className="mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded hover:bg-blue-800 transition-colors md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg width="28" height="28" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M7.95 11.95h32m-32 12h32m-32 12h32"
                />
              </svg>
            </button>

            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>LP판 홈페이지</h1>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {accessToken ? (
              <>
                <span className="font-semibold">{data?.data.name}님 반갑습니다</span>
                <button
                  className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={logout}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="bg-transparent text-blue-600 bg-white font-semibold py-2 px-4 rounded-md hover:bg-blue-100 transition-colors"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
