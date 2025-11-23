import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import type { ResponseMyInfoDto } from '../types/auth';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from '../App';
import useSidebar from '../hooks/useSidebar';

const Navbar = () => {
  const { accessToken, logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen: isSidebarOpen, closeSidebar, toggleSidebar } = useSidebar();

  useEffect(() => {
    if (!accessToken) return;

    const cachedData = queryClient.getQueryData<ResponseMyInfoDto>(["myInfo"]);
    if (cachedData) {
      setData(cachedData);
    } else {
      import('../apis/auth').then(({ getMyInfo }) => {
        getMyInfo().then(res => setData(res)).catch(console.error);
      });
    }

    const unsubscribe = queryClient.getQueryCache().subscribe(() => {
      const updated = queryClient.getQueryData<ResponseMyInfoDto>(["myInfo"]);
      if (updated) setData(updated);
    });

    return () => unsubscribe();
  }, [accessToken]);

  const handleFocusSearch = () => {
    closeSidebar();
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

  const { mutate: deleteUser } = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_API_URL}/v1/users`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      alert("회원탈퇴가 완료되었습니다.");
      navigate("/");
    },
    onError: (err: any) => {
      console.error(err);
      alert("회원탈퇴 중 오류가 발생했습니다.");
    },
  });

  const handleDeleteClick = () => setShowModal(true);
  const handleConfirmDelete = () => {
    deleteUser();
    setShowModal(false);
  };
  const handleCancel = () => setShowModal(false);

  const { mutate: logoutUser } = useMutation({
    mutationFn: async () => logout(),
    onSuccess: () => navigate("/"),
  });
  const logoutId = () => logoutUser();

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-950 text-white shadow-lg transform transition-transform duration-300 z-50
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}>
        <div className="p-6 flex flex-col gap-6">
          <button
            onClick={closeSidebar}
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
              onClick={closeSidebar}
              className="hover:text-blue-300 transition-colors"
            >
              👤 마이페이지
            </Link>
          )}

          {accessToken && (
            <button
              onClick={handleDeleteClick}
              className="hover:text-blue-300 transition-colors text-left mt-4"
            >
              탈퇴하기
            </button>
          )}
        </div>
      </div>

      <nav className="bg-blue-900 text-white relative ml-0 md:ml-64 transition-all">
        <div className="mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded hover:bg-blue-800 transition-colors md:hidden"
              onClick={toggleSidebar}
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

            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
              LP판 홈페이지
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {accessToken ? (
              <>
                <span className="font-semibold">{data?.data.name}님 반갑습니다</span>
                <button
                  className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={logoutId}
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
                  className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-md hover:bg-blue-100 transition-colors"
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
          onClick={closeSidebar}
        />
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[300px] flex flex-col gap-4 text-center">
            <h2 className="text-lg font-semibold">정말 탈퇴하시겠습니까?</h2>
            <div className="flex justify-around mt-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition disabled:bg-gray-400"
              >
                예
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition"
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
