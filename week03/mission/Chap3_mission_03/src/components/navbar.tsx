import { NavLink } from "react-router-dom";

const Navbar = () => {
  const categories = [
    { name: "홈", path: "/" },
    { name: "인기 영화", path: "/movies/popular" },
    { name: "상영 중", path: "/movies/now_playing" },
    { name: "평점 높은", path: "/movies/top_rated" },
    { name: "개봉 예정", path: "/movies/upcoming" },
  ];

  return (
    <nav className="p-4 bg-gray-800 text-white flex gap-2">
      {categories.map((category) => (
        <NavLink
          key={category.path}
          to={category.path}
          className={({ isActive }) =>
            `p-2 rounded-xl ${isActive ? "bg-blue-600" : "bg-gray-500 hover:bg-gray-600"}`
          }
        >
          {category.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
