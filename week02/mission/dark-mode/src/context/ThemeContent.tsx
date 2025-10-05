import { useTheme, THEME } from "./ThemeProvider"
import clsx from "clsx"

export default function ThemeContent() {
    const { theme } = useTheme()
    const isLightMode = theme === THEME.LIGHT

    return (
        <div className={clsx('p-4 h-full w-full flex items-center justify-center transition-colors duration-300', isLightMode ? 'bg-white' : 'bg-gray-800')}>
            <h1 className={clsx('text-2xl font-bold transition-colors duration-300', isLightMode ? 'text-black' : 'text-white')}>
                테마를 변경해보세요!
            </h1>
        </div>
    )
}
