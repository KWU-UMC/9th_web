import { createContext, useState, useContext, ReactNode } from 'react';

// 1. Context에 담길 값들의 타입 정의
interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// 2. Context 생성 (기본값 설정)
// 기본값은 실제 Provider에서 제공하는 값과 형태만 맞추면 됩니다.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Context를 제공하는 Provider 컴포넌트 생성
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false); // 다크모드 상태 관리

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Provider를 통해 isDarkMode 상태와 toggleDarkMode 함수를 전달
  const value = { isDarkMode, toggleDarkMode };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4. Context를 쉽게 사용하기 위한 커스텀 훅 (Custom Hook)
// 이 훅을 사용하면 매번 useContext(ThemeContext)를 쓰지 않아도 됩니다.
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}