import clsx from "clsx";
import { useTheme } from "./ThemeProvider"

export default function ThemeToggleButton() {
    const { theme, toggleTheme}=useTheme();

    const isLightMode = theme==="LIGHT";
    return (
        <button onClick = {toggleTheme}
            className={clsx('px-4 py-2 mt-4 rounded-md transition-all',{
                'bg-black text-white':!isLightMode,
                'bg-white text-black':isLightMode,
            })}
            >
        {isLightMode? 'DARK':'LIGHT'}
    </button>
    );
}