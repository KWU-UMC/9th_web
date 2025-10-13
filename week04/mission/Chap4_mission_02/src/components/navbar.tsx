import { NavLink } from "react-router-dom";

const Navbar = () => {
  const categories = [
    { name: "홈", path: "/" },
    { name: "로그인", path: "/login" },
    { name: "회원가입", path: "/signup" },
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
