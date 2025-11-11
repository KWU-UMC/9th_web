import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 레이아웃
import HomeLayout from './components/HomeLayout'; // (기존)
import MainLayout from './components/MainLayout'; // (신규) 
import ProtectedLayout from './components/ProtectedLayout'; // (신규) 

// 페이지 (기존)
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import GoogleCallbackPage from './pages/GoogleCallbackPage';
import MyPage from './pages/MyPage';
import NotFoundPage from './pages/NotFoundPage';

// (신규) 미션 페이지
import LpListPage from './pages/LpListPage';
import LpDetailPage from './pages/LpDetailPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- 인증 라우트 (기존 HomeLayout) --- */}
        <Route element={<HomeLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth/google/callback" element={<GoogleCallbackPage />} />
        </Route>

        {/* --- (신규) 메인 앱 라우트 (MainLayout 사용) --- */}
        <Route element={<MainLayout />}>
          {/* 목록 (비로그인) */}
          <Route path="/" element={<LpListPage />} />

          {/* 로그인이 필요한 페이지들 (ProtectedLayout 중첩) */}
          <Route element={<ProtectedLayout />}>
            <Route path="/mypage" element={<MyPage />} />
            {/* (미션) 상세 페이지 보호 */}
            <Route path="/lp/:lpid" element={<LpDetailPage />} />
            {/* TODO: /lp/new (LP 생성 페이지) */}
          </Route>
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;