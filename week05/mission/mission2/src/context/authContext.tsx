import { createContext, useContext, type PropsWithChildren } from "react";
import type { LoginRequest } from "../types/auth";
import useLocalStorage from "../hooks/useLocalStorage";
import { postSignin, postSignout } from "../apis/auth";
interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signInData: LoginRequest) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { value: accessToken, setStoredValue: setAccessToken } =
    useLocalStorage("accessToken");
  const { value: refreshToken, setStoredValue: setRefreshToken } =
    useLocalStorage("refreshToken");

  const login = async (signInData: LoginRequest) => {
    try {
      const data = await postSignin(signInData);

      setAccessToken(data.data.accessToken);
      setRefreshToken(data.data.refreshToken);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      postSignout();
      setAccessToken(null);
      setRefreshToken(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        login,
        logout,
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
