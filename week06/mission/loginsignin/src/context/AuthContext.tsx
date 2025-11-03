import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postSignin, postSignout } from "../apis/auth";

interface AuthContextType{
  accessToken: string | null;
  refreshToekn: string | null;
  name: string | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToekn: null,
  name: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({children}: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenFromStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenFromStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  const {
    getItem: getNameFromStorage,
    setItem: setNameFromStorage,
    removeItem: removeNameFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.name);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage(),
  );
  const [refreshToekn, setRefreshToekn] = useState<string | null>(
    getRefreshTokenFromStorage(),
  );
  const [name, setName] = useState<string | null>(
    getNameFromStorage(),
  );

  const login = async (siginData:RequestSigninDto) => {
    try{
      const {data} = await postSignin(siginData);

      if(data){
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;
        const newName = data.name;

        setAccessTokenFromStorage(newAccessToken);
        setRefreshTokenFromStorage(newRefreshToken);
        setNameFromStorage(newName);

        setAccessToken(newAccessToken);
        setRefreshToekn(newRefreshToken);
        setName(newName);
        alert('로그인 성공');
        window.location.href = '/';
      }
    } catch(error){
      console.error('로그인 오류', error);
      alert('로그인 실패');
    }
  };

  const logout = async() => {
    try{
      await postSignout();
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      removeNameFromStorage();

      setAccessToken(null);
      setRefreshToekn(null);
      setName(null);

      alert('로그아웃 성공');
      window.location.href = "/";
    }catch(error){
      console.error('로그아웃 오류', error);
      alert('로그아웃 실패');
    }
  };

  return (
    <AuthContext.Provider value={{accessToken, refreshToekn, name, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context){
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }

  return context;
}