import { createContext, useContext, useState, type PropsWithChildren } from "react";

export type THEME = "LIGHT" | "DARK";

interface IThemeContext {
    theme: THEME;
    toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({children}:PropsWithChildren) => {
    const [theme, setTheme]=useState<THEME>("LIGHT");
    const toggleTheme = () => {
        setTheme((prevTheme):THEME=>
            prevTheme === "LIGHT"?"DARK":"LIGHT"
        );
    };
    return (
        <ThemeContext.Provider value={{theme:theme, toggleTheme: toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(!context)
    {
        throw new Error('useTheme 사용을 위해선 ThemeProvider로 감싸야 합니다.');
    }
    return context;
};