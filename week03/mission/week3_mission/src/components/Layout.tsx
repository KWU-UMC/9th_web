import { NavLink, Outlet } from 'react-router-dom';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-lg text-sm font-medium transition ${
    isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
  }`;

export default function Layout() {
  return (
    <div className="mx-auto max-w-7xl px-5">
      {/* Navbar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <nav className="flex items-center gap-2 py-4">
          <NavLink to="/" className={navClass}>홈</NavLink>
          <NavLink to="/popular" className={navClass}>인기 영화</NavLink>
          <NavLink to="/upcoming" className={navClass}>개봉 예정</NavLink>
          <NavLink to="/top-rated" className={navClass}>평점 높은</NavLink>
          <NavLink to="/now-playing" className={navClass}>상영 중</NavLink>
        </nav>
      </header>

      {/* 각 페이지가 들어오는 자리 */}
      <main className="py-6">
        <Outlet />
      </main>
    </div>
  );
}
