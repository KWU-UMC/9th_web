import { useTheme } from './ThemeProvider';
import ThemeToggleButton from './ThemeToggleButton';

function Navbar() {
  // isDarkMode 상태만 필요하므로, isDarkMode만 구조 분해 할당으로 가져옴
  const { isDarkMode } = useTheme();

  // isDarkMode 값에 따라 TailwindCSS 클래스를 동적으로 변경
  const navClass = isDarkMode
    ? 'bg-gray-800 text-white' // 다크 모드일 때
    : 'bg-gray-200 text-black'; // 라이트 모드일 때

  return (
    <nav className={`p-4 flex justify-between items-center transition-colors ${navClass}`}>
      <h1 className="text-xl font-bold">UMC React Lecture</h1>
      <ThemeToggleButton />
    </nav>
  );
}

export default Navbar;