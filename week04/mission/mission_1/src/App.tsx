import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 페이지 및 레이아웃 컴포넌트들을 import
import RootLayout from './layout/RootLayout';
import HomePage from './pages/HomePage';
import PopularMoviesPage from './pages/PopularMoviesPage';
import UpcomingMoviesPage from './pages/UpcomingMoviesPage';
import TopRatedMoviesPage from './pages/TopRatedMoviesPage';
import NowPlayingMoviesPage from './pages/NowPlayingMoviesPage';
import MovieDetailPage from './pages/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage';
// --- 미션 2와 3을 위한 페이지 import 추가 ---
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// 라우터 정의
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // 모든 페이지에 공통 레이아웃 적용
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'movies/popular', element: <PopularMoviesPage /> },
      { path: 'movies/upcoming', element: <UpcomingMoviesPage /> },
      { path: 'movies/top-rated', element: <TopRatedMoviesPage /> },
      { path: 'movies/now-playing', element: <NowPlayingMoviesPage /> },
      { path: 'movies/:movieId', element: <MovieDetailPage /> },
      
      // --- 여기에 로그인 및 회원가입 경로를 추가합니다 ---
      {
        path: 'login', // '/login' 경로
        element: <LoginPage />,
      },
      {
        path: 'signup', // '/signup' 경로
        element: <SignupPage />,
      },

      { path: '*', element: <NotFoundPage /> } // 404 페이지는 항상 마지막에
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