import { useTheme, THEME } from './ThemeProvider'
import ThemeToggleButton from './ThemeToggleButton'
import clsx from 'clsx'

export default function Navbar() {
    const { theme } = useTheme()
    const isLightMode = theme === THEME.LIGHT;

    return (
        <nav className={clsx('p-4 w-full flex justify-end shadow-md transition-colors duration-300', isLightMode ? 'bg-gray-100' : 'bg-gray-900')}>
            <ThemeToggleButton />
        </nav>
    )
}
