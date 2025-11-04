import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Context에서 관리할 상태의 타입 정의
interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// 2. Context 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Context를 앱 전체에 제공할 Provider 컴포넌트
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('accessToken'));

  const isLoggedIn = !!token;

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('accessToken', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Context를 쉽게 사용하기 위한 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};