import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import NotFoundPage from './pages/NotFoundPage';

import HomeLayout from './layouts/HomeLayout';
import ProtectedLayout from './layouts/ProtectedLayout'; // 1. 레이아웃 가져오기

function App() {
  return (
    <Routes>
      {/* 2. 누구나 접근 가능한 페이지 (HomeLayout 사용) */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* 3. 로그인이 필요한 페이지 (ProtectedLayout 사용) */}
      <Route element={<ProtectedLayout />}>
        <Route path="/mypage" element={<MyPage />} />
        {/* <Route path="/premium/webtoon/1" element={<PremiumWebtoonPage />} /> */}
      </Route>

      {/* 4. 404 페이지 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;