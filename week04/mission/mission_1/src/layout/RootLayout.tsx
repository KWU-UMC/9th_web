// src/layout/RootLayout.tsx (예시 코드)
import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';

function RootLayout() {
  // NavLink의 className을 동적으로 설정하기 위한 함수
  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    isActive ? 'text-white font-bold' : 'text-gray-400 hover:text-white';

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 shadow-md">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center">
            UMC Movie App <span className="text-2xl ml-2">🍿</span>
          </Link>
          <div className="flex items-center space-x-4">
            <NavLink to="/" className={navLinkClass}>홈</NavLink>
            <NavLink to="/movies/popular" className={navLinkClass}>인기 영화</NavLink>
            <NavLink to="/movies/upcoming" className={navLinkClass}>개봉 예정</NavLink>
            <NavLink to="/movies/top-rated" className={navLinkClass}>평점 높은</NavLink>
            <NavLink to="/movies/now-playing" className={navLinkClass}>상영 중</NavLink>
          </div>
          {/* --- 여기에 로그인/회원가입 버튼 추가 --- */}
          <div className="flex items-center space-x-2">
            <Link to="/login" className="px-4 py-2 bg-blue-600 rounded-md text-sm font-semibold hover:bg-blue-700">로그인</Link>
            <Link to="/signup" className="px-4 py-2 bg-gray-700 rounded-md text-sm font-semibold hover:bg-gray-600">회원가입</Link>
          </div>
        </nav>
      </header>

      <main>
        {/* 자식 라우트의 컴포넌트가 이 자리에 렌더링됩니다 */}
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;