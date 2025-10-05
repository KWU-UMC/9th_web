import { createContext, useContext, useState, type ReactNode } from "react";

export enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK",
}
type TTheme = THEME.LIGHT | THEME.DARK;
interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

  const toggleTheme = (): void => {
    setTheme((prevTheme): TTheme => {
      return prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): IThemeContext => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
