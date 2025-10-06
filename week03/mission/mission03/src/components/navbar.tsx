import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="flex gap-4 p-4">
      <NavLink to="/" className={({ isActive }) => (isActive ? "text-green-500 font-bold" : "text-gray-500")}>
        홈
      </NavLink>
      <NavLink to="/popular" className={({ isActive }) => (isActive ? "text-green-500 font-bold" : "text-gray-500")}>
        인기 영화
      </NavLink>
      <NavLink to="/playing" className={({ isActive }) => (isActive ? "text-green-500 font-bold" : "text-gray-500")}>
        상영 중
      </NavLink>
      <NavLink to="/top_rated" className={({ isActive }) => (isActive ? "text-green-500 font-bold" : "text-gray-500")}>
        별점 높은
      </NavLink>
      <NavLink to="/upcoming" className={({ isActive }) => (isActive ? "text-green-500 font-bold" : "text-gray-500")}>
        개봉 예정
      </NavLink>
    </nav>
  )
}

export default Navbar
