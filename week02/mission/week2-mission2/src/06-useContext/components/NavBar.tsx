import clsx from "clsx";
import { useTheme } from "../context/ThemeProvider";
import ThemeToggleButton from "../context/ThemeToggleButton";

export default function Navbar() {

    const { theme }=useTheme();

    const isLightMode = theme==="LIGHT";

    return (
        <nav className={clsx(
            'p-4 w-full flex justify-end',
            isLightMode?'bg-white':'bg-black'
        )}>
            <ThemeToggleButton />
        </nav>
    )
}