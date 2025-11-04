// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "../pages/HomePage";
import MoviesPage from "../pages/MoviesPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import NowPlayingPage from "../pages/NowPlayingPage";
import PopularPage from "../pages/PopularPage";
import TopRatedPage from "../pages/TopRatedPage";
import UpcomingPage from "../pages/UpcomingPage";
import Layout from "../components/Layout";
import { isAuthed } from "../lib/auth";

// 보호용 래퍼
function ProtectedRoute() {
  const authed = isAuthed();
  return authed ? <Outlet /> : <Navigate to="/login" replace />;
}

// 레이아웃을 로그인에서만 제외하고 싶다면 아래처럼 구성
export default function AppRouter() {
  const [, setTick] = useState(0);
  // localStorage 변경(다른 탭)에도 반응하도록
  useEffect(() => {
    const fn = () => setTick((x) => x + 1);
    window.addEventListener("storage", fn);
    return () => window.removeEventListener("storage", fn);
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* 이하 전부 보호 */}
        <Route element={<ProtectedRoute />}>
          {/* 공통 레이아웃 적용 섹션 */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:id" element={<MovieDetailPage />} />
            {/* <Route path="/category/:category" element={<MoviesByCategory />} /> */}
            <Route path="/now-playing" element={<NowPlayingPage />} />
            <Route path="/popular" element={<PopularPage />} />
            <Route path="/top-rated" element={<TopRatedPage />} />
            <Route path="/upcoming" element={<UpcomingPage />} />
          </Route>
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
