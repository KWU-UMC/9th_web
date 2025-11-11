import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { ResquestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSingin } from "../apis/auth";

interface AuthContextType {
    accessToken: string|null;
    refreshToken: string|null;
    isAuthenticated: boolean; 
    login: (singinData:ResquestSigninDto) => Promise<void>;
    logout:()=>Promise<void>;
}

/* eslint-disable-next-line react-refresh/only-export-components */
export const AuthContext = createContext<AuthContextType>({
    accessToken:null,
    refreshToken:null,
    isAuthenticated: false,
    login:async () => {},
    logout:async () => {},
});

export const AuthProvider = ({children}:PropsWithChildren) => {
    const {
        getItem:getAccessTokenFromStorage,
        setItem:setAccessTokenInStorage,
        removeItem:removeAccessTokenFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {
        getItem:getRefreshTokenFromStorage,
        setItem:setRefreshTokenInStorage,
        removeItem:removeRefreshTokenFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const[accessToken,setAccessToken]=useState<string|null>(
        getAccessTokenFromStorage(), //지연 초기화 방식 사용->초기값 이후 리렌더링 안해도 되는거 줄일 수 잇음(재사용성)
    );

    const[refreshToken,setRefreshToken]=useState<string|null>(
        getRefreshTokenFromStorage(),
    )

    const login = async (signData:ResquestSigninDto) => {
        try{
            const {data}= await postSingin(signData);
            if(data){
                const newAccessToken:string = data.accessToken;
                const newRefreshToken:string=data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
                alert("로그인 성공");
                window.location.href="/my";
            }
        } catch(error)
        {
            console.error("로그인 오류",error);
            alert("로그인 실패");
        }
        
    }

    const logout=async()=>{
        try{
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            setAccessToken(null);
            setRefreshToken(null);

            alert("로그아웃 성공");
            window.location.href="/login";
        }catch(error){
            console.error("로그아웃 오류",error)
            alert("로그아웃 실패");
        }
    }

    return (
        <AuthContext.Provider value ={{accessToken,refreshToken,isAuthenticated: !!accessToken,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const useAuth = () =>{
    const context : AuthContextType = useContext(AuthContext);
    if(!context){
       throw new Error("AuthContext를 찾을 수 없습니다."); 
    }

    return context;
}