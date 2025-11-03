import { NavLink } from "react-router-dom"
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4">
      <div className="flex gap-4">
        <NavLink to="/" className={({ isActive }) => (isActive ? "text-black-500 font-bold" : "text-gray-500")}>
          홈
        </NavLink>
        <NavLink to="/popular" className={({ isActive }) => (isActive ? "text-black-500 font-bold" : "text-gray-500")}>
          인기 영화
        </NavLink>
        <NavLink to="/playing" className={({ isActive }) => (isActive ? "text-black-500 font-bold" : "text-gray-500")}>
          상영 중
        </NavLink>
        <NavLink to="/top_rated" className={({ isActive }) => (isActive ? "text-black-500 font-bold" : "text-gray-500")}>
          별점 높은
        </NavLink>
        <NavLink to="/upcoming" className={({ isActive }) => (isActive ? "text-black-500 font-bold" : "text-gray-500")}>
          개봉 예정
        </NavLink>
      </div>

      <div className="flex gap-4">
        <NavLink to="/login" className={({ isActive }) => (isActive ? "text-black-500 font-bold" : "text-gray-500")}>
          로그인
        </NavLink>
        <NavLink to="/my" className={({ isActive }) => (isActive ? "text-black-500 font-bold" : "text-gray-500")}>
          <UserCircleIcon className="w-7 h-7" />
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
