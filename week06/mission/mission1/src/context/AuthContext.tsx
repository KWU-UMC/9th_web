import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { api } from '../apis/axios'; // 네가 만든 api 인스턴스
import { getMyPageInfo } from '../apis/auth'; // 네가 만든 'v1/users/me' API

// 1. 유저 정보 타입 (getMyPageInfo 응답 참고)
interface User {
  id: number;
  email: string;
  name: string;
  // ... (nickname 등이 있다면 추가)
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null; // 2. 유저 정보 추가
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken')
  );
  const [user, setUser] = useState<User | null>(null); // 3. 유저 state

  const isLoggedIn = !!accessToken;

  // 4. (중요) 앱 로드 시, 또는 토큰 변경 시 유저 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getMyPageInfo(); // '/v1/users/me' 호출
        setUser(data.data); // (네가 올린 MyPage.tsx 참고)
      } catch (error) {
        console.error('유저 정보 로드 실패', error);
        // (401 에러는 axios.tsx 인터셉터가 알아서 토큰 갱신/로그아웃 처리)
      }
    };

    if (accessToken) {
      // axios 헤더에 토큰 설정
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      fetchUserInfo();
    } else {
      // 토큰 없으면 헤더 삭제, 유저 정보 비우기
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    }
  }, [accessToken]); // accessToken이 바뀔 때마다 실행

  const login = (newAccessToken: string, newRefreshToken: string) => {
    setAccessToken(newAccessToken);
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    // (useEffect가 자동으로 유저 정보를 가져올 것임)
  };

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // (useEffect가 자동으로 헤더/유저 정보를 비울 것임)
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
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