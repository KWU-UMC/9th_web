// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { api } from '../apis/axios'; 
import { getMyPageInfo } from '../apis/auth'; 

interface User {
  id: number;
  email: string;
  name: string;
  bio?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken')
  );
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = !!accessToken;

  // ⭐️ [오류 수정] logout을 useCallback으로 먼저 정의
  const logout = useCallback(() => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, []);

  const fetchUserInfo = useCallback(async () => {
    try {
      const data = await getMyPageInfo(); // { data: { id, email, ... } }
      
      // ⭐️ [오류 수정] data가 (undefined)가 아니고 data.data가 있을 때만 setUser 실행
      if (data && data.data) {
        setUser(data.data); 
      }
      
    } catch (error) {
      console.error('유저 정보 로드 실패', error);
      if ((error as any).response?.status === 401) {
        logout(); 
      }
    }
  }, [logout]); 

  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      fetchUserInfo();
    } else {
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    }
  }, [accessToken, fetchUserInfo]); 

  const login = (newAccessToken: string, newRefreshToken: string) => {
    setAccessToken(newAccessToken);
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
  };

  const refetchUser = () => {
    if (accessToken) {
      fetchUserInfo();
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};