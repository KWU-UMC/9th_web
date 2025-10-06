// src/App.tsx

import React from 'react';
import './App.css';

// React Router에서 필요한 함수/컴포넌트를 import
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 페이지 및 레이아웃 컴포넌트들을 import
import HomePage from './pages/HomePage';
import PopularMoviesPage from './pages/PopularMoviesPage';
import UpcomingMoviesPage from './pages/UpcomingMoviesPage';
import TopRatedMoviesPage from './pages/TopRatedMoviesPage';
import NowPlayingMoviesPage from './pages/NowPlayingMoviesPage';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage'; // 영화 상세 페이지
import RootLayout from './layout/RootLayout';

// 라우터 정의
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // 모든 페이지에 공통적으로 적용될 레이아웃
    errorElement: <NotFoundPage />, // 자식 라우트에서 발생하는 모든 에러 처리
    children: [
      {
        index: true, // 부모 경로('/')일 때 렌더링될 기본 자식 라우트
        element: <HomePage />,
      },
      {
        path: 'movies/popular', // 부모 경로가 '/'이므로, '/movies/popular'가 됨
        element: <PopularMoviesPage />,
      },
      {
        path: 'movies/upcoming',
        element: <UpcomingMoviesPage />,
      },
      {
        path: 'movies/top-rated',
        element: <TopRatedMoviesPage />,
      },
      {
        path: 'movies/now-playing',
        element: <NowPlayingMoviesPage />,
      },
      {
        path: 'movies/:movieId', // 동적 라우팅: /movies/123 -> movieId = "123"
        element: <MovieDetailPage />,
      },
      {
        path: '*', // 정의되지 않은 모든 경로 (404 페이지)
        element: <NotFoundPage />,
      }
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;