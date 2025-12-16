import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {

    const {setItem:setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {setItem:setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    //return된(렌더링) 이후 작업을 원해서 useEffect
    useEffect(()=>{
        const urlParams=new URLSearchParams(window.location.search);
        const accessToken=urlParams.get("accessToken");
        const refreshToken=urlParams.get("refreshToken");

        if(accessToken){
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            window.location.href="/my";
        }
    },[setAccessToken,setRefreshToken]);
    return (
        <>

        </>
    )
}

export default GoogleLoginRedirectPage;