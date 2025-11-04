import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PopularPage from './pages/PopularPage';
import UpcomingPage from './pages/UpcomingPage';
import TopRatedPage from './pages/TopRatedPage';
import NowPlayingPage from './pages/NowPlayingPage';
import MovieDetailPage from './pages/MovieDetailPage.tsx'; // ✅ 추가

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/top-rated" element={<TopRatedPage />} />
        <Route path="/now-playing" element={<NowPlayingPage />} />

        {/* ✅ 상세 페이지 동적 라우트 */}
        <Route path="/movies/:movieId" element={<MovieDetailPage />} />

        <Route path="*" element={<div className="p-6">페이지를 찾을 수 없습니다.</div>} />
      </Route>
    </Routes>
  );
}
