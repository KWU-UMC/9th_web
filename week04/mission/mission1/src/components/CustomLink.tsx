import { NavLink } from "react-router-dom";

interface CustomLinkProps {
  text: string;
  url: string;
}

export default function CustomLink({ text, url }: CustomLinkProps) {
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        `font-bold ${
          isActive ? "text-green-600" : "text-gray-600 hover:text-gray-800"
        }`
      }
    >
      {text}
    </NavLink>
  );
}
