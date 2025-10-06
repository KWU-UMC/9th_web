import { useTheme } from './ThemeProvider';

function ThemeContent() {
  const { isDarkMode } = useTheme();

  // isDarkMode 값에 따라 배경과 텍스트 색상을 변경
  const contentClass = isDarkMode
    ? 'bg-gray-900 text-gray-300' // 다크 모드일 때
    : 'bg-white text-gray-800';   // 라이트 모드일 때

  return (
    <div className={`min-h-screen p-8 transition-colors ${contentClass}`}>
      <h2 className="text-3xl font-bold mb-4">Context API를 이용한 다크모드</h2>
      <p>
        이 페이지는 useContext 훅을 사용하여 전역적인 테마 관리를 구현한 예시입니다.
        <br />
        토글 버튼을 눌러보세요!
      </p>
    </div>
  );
}

export default ThemeContent;