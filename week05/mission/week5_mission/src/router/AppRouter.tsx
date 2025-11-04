// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

import MoviesPage from "../pages/MoviesPage";
import MovieDetailPage from "../pages/MovieDetailPage";

// 재사용 컴포넌트형 목록 페이지
import MoviesByCategory from "../pages/MoviesByCategory";

// 보호된 페이지 예시
import MyPage from "../pages/MyPage";
import ProtectedRoute from "./ProtectedRoute";
import SocialLoginSuccessPage from "../pages/SocialLoginSuccessPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공개 경로 (누구나 접근 가능) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />

        {/* 인기 영화 */}
        <Route
          path="/movies/popular"
          element={
            <MoviesByCategory
              endpoint="movie/popular"
              title="인기 영화"
            />
          }
        />

        {/* 높은 평점 영화 */}
        <Route
          path="/movies/top-rated"
          element={
            <MoviesByCategory
              endpoint="movie/top_rated"
              title="높은 평점 영화"
            />
          }
        />

        {/* 개봉 예정작 */}
        <Route
          path="/movies/upcoming"
          element={
            <MoviesByCategory
              endpoint="movie/upcoming"
              title="개봉 예정작"
            />
          }
        />

        {/* 현재 상영 중 */}
        <Route
          path="/movies/now-playing"
          element={
            <MoviesByCategory
              endpoint="movie/now_playing"
              title="현재 상영 중"
            />
          }
        />

        {/* 개별 영화 상세 */}
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />

        {/* 인증 관련 페이지 (로그인/회원가입은 항상 열려 있어야 함) */}
        // AppRouter.tsx
        <Route path="/social-login-success" element={<SocialLoginSuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 보호된 경로 (로그인 필요) */}
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />

        {/* TODO: 404 페이지 필요하면 여기 추가 */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
