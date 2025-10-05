import { useTheme } from "../context/themeProvider";
import clsx from "clsx";
export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className={clsx("rounded-md transition-all w-13 h-13", {
        "bg-black text-white": theme === "DARK",
        "bg-white text-black": theme === "LIGHT",
      })}
      onClick={toggleTheme}
    >
      {theme === "LIGHT" ? "🌜" : "🌞"}
    </button>
  );
}
