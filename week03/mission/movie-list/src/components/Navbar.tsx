import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="flex gap-x-5 m-5">
      <NavLink to="/" className={({ isActive }) => isActive ? 'text-green-300' : ''}>
        홈
      </NavLink>
      <NavLink to="/popular" className={({ isActive }) => isActive ? 'text-green-300' : ''}>
        인기 영화
      </NavLink>
      <NavLink to="/now_playing" className={({ isActive }) => isActive ? 'text-green-300' : ''}>
        상영 중
      </NavLink>
      <NavLink to="/top_rated" className={({ isActive }) => isActive ? 'text-green-300' : ''}>
        평점 높은
      </NavLink>
      <NavLink to="/upcoming" className={({ isActive }) => isActive ? 'text-green-300' : ''}>
        개봉 예정
      </NavLink>
    </nav>
  )
}

export default Navbar
