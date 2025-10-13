// src/pages/NotFoundPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <p className="text-3xl font-semibold mb-8">페이지를 찾을 수 없습니다 😭</p>
      <Link to="/" className="px-6 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition-colors">
        홈으로 돌아가기
      </Link>
    </div>
  );
}

export default NotFoundPage;