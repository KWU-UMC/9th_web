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
  // ⭐️ (신규) 낙관적 업데이트를 위한 setter
  setOptimisticUser: (updates: Partial<User>) => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken')
  );
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = !!accessToken;

  const logout = useCallback(() => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, []);

  const fetchUserInfo = useCallback(async () => {
    try {
      const data = await getMyPageInfo();
      // ⭐️ [수정] 백엔드 미실행 시 data가 undefined일 수 있음 (오류 방지)
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

  // ⭐️ (신규) onMutate에서 호출할 함수
  const setOptimisticUser = (updates: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      return { ...prevUser, ...updates };
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn, 
        user, 
        login, 
        logout, 
        refetchUser, 
        setOptimisticUser // ⭐️ 추가
      }}
    >
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