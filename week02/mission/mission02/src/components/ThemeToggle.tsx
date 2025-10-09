import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      onClick={toggleTheme}
      className="
        rounded-xl px-3 py-2 text-sm font-bold transition-colors
        bg-neutral-300 text-neutral-900 hover:bg-neutral-400
        dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600
      "
      aria-label="Toggle dark mode"
    >
      {next}
    </button>
  );
}
