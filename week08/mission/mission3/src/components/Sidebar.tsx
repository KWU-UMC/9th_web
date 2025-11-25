import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* 오버레이 */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />
      {/* 사이드바 본체 */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#121212] text-white shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-5 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-pink-500">Menu</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>
        <nav className="p-4 flex flex-col gap-4 mt-4">
          <Link to="/" onClick={onClose} className="text-lg hover:text-pink-500">🔍 찾기</Link>
          <Link to="/mypage" onClick={onClose} className="text-lg hover:text-pink-500">👤 마이페이지</Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;