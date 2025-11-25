import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSidebar } from '../hooks/useSidebar';

const Layout: React.FC = () => {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Header onToggleSidebar={toggle} />
      <Sidebar isOpen={isOpen} onClose={close} />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;