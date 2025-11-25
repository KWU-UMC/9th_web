import { createContext, useContext, useState, type PropsWithChildren } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface AuthContextType{
  accessToken: string | null;
  refreshToekn: string | null;
  name: string | null;
  setAccessToken: (accessToken:string | null) => void;
  setRefreshToekn: (refreshToken:string | null) => void;
  setName: (name:string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToekn: null,
  name: null,
  setAccessToken: (accessToken:string | null) => {void accessToken},
  setRefreshToekn: (refreshToken:string | null) => { void refreshToken},
  setName: (name:string | null) => {void name},
});

export const AuthProvider = ({children}: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    getItem: getRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  const {
    getItem: getNameFromStorage,
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

  return (
    <AuthContext.Provider value={{accessToken, refreshToekn, name, setAccessToken, setName, setRefreshToekn}}>
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