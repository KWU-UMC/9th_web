// src/components/Navbar.tsx

import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const activeLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-red-400 font-bold' : 'text-white hover:text-gray-300';

  return (
    <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-white">
          UMC Movie App 🍠
        </NavLink>
        <div className="space-x-6">
          <NavLink to="/" className={activeLinkStyle} end> {/* 'end' prop으로 정확한 매칭 */}
            홈
          </NavLink>
          <NavLink to="/movies/popular" className={activeLinkStyle}>
            인기 영화
          </NavLink>
          <NavLink to="/movies/upcoming" className={activeLinkStyle}>
            개봉 예정
          </NavLink>
          <NavLink to="/movies/top-rated" className={activeLinkStyle}>
            평점 높은
          </NavLink>
          <NavLink to="/movies/now-playing" className={activeLinkStyle}>
            상영 중
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;