import { useTheme, THEME } from "./ThemeProvider";
import clsx from "clsx";

export default function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();
    const isLightMode = theme === THEME.LIGHT;

    return (
        <button onClick={toggleTheme}
            className={clsx('px-4 py-2 font-semibold rounded-md transition-all duration-300', {
                'bg-gray-800 text-white hover:bg-gray-700': isLightMode,
                'bg-yellow-300 text-black hover:bg-yellow-400': !isLightMode,
            })}>
            {isLightMode ? "🌜 다크 모드" : "🌞 라이트 모드"}
        </button>
    );
}
