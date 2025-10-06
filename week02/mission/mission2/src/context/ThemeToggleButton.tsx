import { useTheme } from './ThemeProvider';

function ThemeToggleButton() {
  // useTheme 훅으로 isDarkMode 상태와 toggleDarkMode 함수를 가져옴
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
    >
      {isDarkMode ? '라이트 모드로 변경' : '다크 모드로 변경'}
    </button>
  );
}

export default ThemeToggleButton;