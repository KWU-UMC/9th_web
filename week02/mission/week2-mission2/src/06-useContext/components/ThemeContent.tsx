import clsx from "clsx";
import { useTheme } from "../context/ThemeProvider";

export default function ThemeContent() {

    const { theme }=useTheme();
    const isLightMode = theme==="LIGHT";

    return <div className={clsx(
        'p-4 h-dvh', isLightMode? 'bg-white text-black font-bold' : 'font-bold bg-black text-white'
    )}>광운대학교 전도윤입니다</div>
}