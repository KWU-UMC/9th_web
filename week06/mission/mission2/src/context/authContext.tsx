import { createContext, useContext, type PropsWithChildren } from "react";
import type { LoginRequest } from "../types/auth";
import useLocalStorage from "../hooks/useLocalStorage";
import { postSignin, postSignout } from "../apis/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  name: string | null;
  login: (signInData: LoginRequest) => void;
  logout: () => Promise<void>;
  setTokens: (access: string, refresh: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { value: accessToken, setStoredValue: setAccessToken } =
    useLocalStorage("accessToken");
  const { value: refreshToken, setStoredValue: setRefreshToken } =
    useLocalStorage("refreshToken");
  const { value: name, setStoredValue: setName } = useLocalStorage("name");
  console.log(accessToken, refreshToken, name);
  const login = async (signInData: LoginRequest) => {
    try {
      const data = await postSignin(signInData);
      setAccessToken(data.data.accessToken);
      setRefreshToken(data.data.refreshToken);
      if (data.data.name) {
        setName(data.data.name);
      }

      return true;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const setTokens = (access: string, refresh: string, name?: string) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    if (name) {
      setName(name);
    }
  };
  const logout = async () => {
    try {
      await postSignout();
      setAccessToken(null);
      setRefreshToken(null);
      setName(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        name,
        login,
        logout,
        setTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
