import React, { createContext, useContext, useState, type PropsWithChildren } from "react";
// clsx는 이제 필요 없으므로 주석 처리하거나 삭제해도 됩니다.
// import clsx from "clsx";

// 1. ThemeProvider.tsx의 내용 (변경 없음)
// ==================================

// 테마 종류를 상수로 정의합니다.
const THEME = {
    LIGHT: 'LIGHT',
    DARK: 'DARK',
} as const;

// THEME 상수의 값들로부터 타입을 추론합니다.
type TTheme = typeof THEME[keyof typeof THEME];

// Context가 하위 컴포넌트로 전달할 값의 타입을 정의합니다.
type IThemeContext = {
    theme: TTheme;
    toggleTheme: () => void;
}

// Context를 생성합니다.
const ThemeContext = createContext<IThemeContext | undefined>(undefined);

// 자식 컴포넌트에게 테마 상태와 상태 변경 함수를 제공하는 Provider 컴포넌트입니다.
const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

    const toggleTheme = (): void => {
        setTheme((prevTheme): TTheme => prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Context를 쉽게 사용하기 위한 커스텀 훅입니다.
const useTheme = (): IThemeContext => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// 2. ThemeToggleButton.tsx의 내용 (스타일 수정)
// ==================================
function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();
    const isLightMode = theme === THEME.LIGHT;

    // 인라인 스타일 객체 정의
    const buttonStyle = {
        padding: '0.5rem 1rem',
        fontWeight: '600',
        borderRadius: '0.375rem',
        transition: 'all 0.3s',
        border: 'none',
        cursor: 'pointer',
        ...(isLightMode
            ? { backgroundColor: '#1f2937', color: 'white' } // 다크모드로 가는 버튼
            : { backgroundColor: '#fcd34d', color: 'black' }) // 라이트모드로 가는 버튼
    };

    return (
        <button onClick={toggleTheme} style={buttonStyle}>
            {isLightMode ? "🌜 다크 모드" : "🌞 라이트 모드"}
        </button>
    );
}

// 3. Navbar.tsx의 내용 (스타일 수정)
// ==================================
function Navbar() {
    const { theme } = useTheme();
    const isLightMode = theme === THEME.LIGHT;

    // 인라인 스타일 객체 정의
    const navStyle: React.CSSProperties = {
        padding: '1rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        transition: 'background-color 0.3s',
        backgroundColor: isLightMode ? '#f3f4f6' : '#111827'
    };

    return (
        <nav style={navStyle}>
            <ThemeToggleButton />
        </nav>
    );
}

// 4. ThemeContent.tsx의 내용 (스타일 수정)
// ==================================
function ThemeContent() {
    const { theme } = useTheme();
    const isLightMode = theme === THEME.LIGHT;

    // 인라인 스타일 객체 정의
    const contentStyle: React.CSSProperties = {
        padding: '1rem',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s',
        backgroundColor: isLightMode ? 'white' : '#1f2937',
        color: isLightMode ? 'black' : 'white'
    };

    const headingStyle = {
        fontSize: '1.5rem',
        lineHeight: '2rem',
        fontWeight: '700',
    };

    return (
        <div style={contentStyle}>
            <h1 style={headingStyle}>
                테마를 변경해보세요!
            </h1>
        </div>
    );
}

// 5. ContextPage.tsx의 내용 (스타일 수정)
// ==================================
function ContextPage() {
    const pageStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%'
    };

    const mainStyle: React.CSSProperties = {
        flex: '1 1 0%',
        width: '100%'
    };

    return (
        <div style={pageStyle}>
            <Navbar />
            <main style={mainStyle}>
                <ThemeContent />
            </main>
        </div>
    );
}

// 6. App (최상위 실행 컴포넌트) (변경 없음)
// ==================================
export default function App() {
  return (
    <ThemeProvider>
      <ContextPage />
    </ThemeProvider>
  )
}