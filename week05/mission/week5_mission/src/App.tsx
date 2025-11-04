// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import PopularPage from "./pages/PopularPage";
import UpcomingPage from "./pages/UpcomingPage";
import TopRatedPage from "./pages/TopRatedPage";
import NowPlayingPage from "./pages/NowPlayingPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./auth/RequireAuth";
import SignupPage from "./pages/SignupPage";


export default function App() {
  return (
    <Routes>
      {/* 공개 라우트 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />  
      {/* 보호 라우트(로그인 필요) */}
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/top-rated" element={<TopRatedPage />} />
          <Route path="/now-playing" element={<NowPlayingPage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="*" element={<div className="p-6">페이지를 찾을 수 없습니다.</div>} />
        </Route>
      </Route>
    </Routes>
  );
}
