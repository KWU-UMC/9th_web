// src/layout/RootLayout.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function RootLayout() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet /> {/* 자식 라우트 컴포넌트들이 이 자리에 렌더링됩니다. */}
      </main>
    </div>
  );
}

export default RootLayout;