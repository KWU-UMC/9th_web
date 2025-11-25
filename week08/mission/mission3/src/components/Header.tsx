import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-black text-white border-b border-gray-800">
      <div className="flex items-center gap-4">
        {/* 🍔 햄버거 버튼 */}
        <button onClick={onToggleSidebar} className="p-2 rounded-md hover:bg-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <Link to="/" className="text-2xl font-bold text-pink-500 no-underline">돌려돌려LP판</Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link to="/login" className="text-sm font-bold hover:text-pink-500 text-white">로그인</Link>
      </div>
    </header>
  );
};

export default Header;