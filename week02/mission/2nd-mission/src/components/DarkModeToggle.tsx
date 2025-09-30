import { useTheme } from "../context/ThemeContext";

export const DarkModeToggle = () => {
  const { isDark, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      className="px-3 py-1 rounded-md text-sm border
                 bg-white/60 dark:bg-zinc-800/60
                 border-zinc-300 dark:border-zinc-600
                 text-zinc-800 dark:text-zinc-100
                 hover:bg-white/80 dark:hover:bg-zinc-700/80
                 transition"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default DarkModeToggle;
