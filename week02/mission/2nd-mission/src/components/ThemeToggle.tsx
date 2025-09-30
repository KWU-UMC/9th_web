import { useTheme } from "../context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  return (
    <button className="btn btn--toggle" onClick={toggle} aria-label="Toggle theme">
      {theme === "light" ? "🌙 다크로" : "☀️ 라이트로"}
    </button>
  );
};
