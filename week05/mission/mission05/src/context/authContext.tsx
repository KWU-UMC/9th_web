import { createContext, useContext, type PropsWithChildren } from "react";
import type { LoginRequest } from "../types/auth";
import useLocalStorage from "../hooks/useLocalStorage";
import { postSignin, postSignout } from "../apis/auth";
import { LS_KEYS } from "../constants/key";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signInData: LoginRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  /** ✅ 소셜/콜백에서 직접 토큰 주입 */
  applyTokens: (access: string, refresh?: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { value: accessToken, setStoredValue: setAccessToken } =
    useLocalStorage(LS_KEYS.ACCESS);
  const { value: refreshToken, setStoredValue: setRefreshToken } =
    useLocalStorage(LS_KEYS.REFRESH);

  const login = async (signInData: LoginRequest) => {
    try {
      const res = await postSignin(signInData);
      if (!res.status) return false;
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await postSignout();
    } catch {
      /* noop */
    } finally {
      setAccessToken(null);
      setRefreshToken(null);
    }
  };

  /** ✅ 소셜 콜백에서 바로 토큰 저장 */
  const applyTokens = (access: string, refresh?: string | null) => {
    setAccessToken(access);
    if (typeof refresh !== "undefined") {
      setRefreshToken(refresh ?? null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, login, logout, applyTokens }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within a AuthProvider");
  return ctx;
};
