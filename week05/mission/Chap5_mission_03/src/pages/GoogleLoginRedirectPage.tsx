import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useEffect } from "react";

const GoogleLoginRedirectPage = () => {
    const {setItem: setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {setItem: setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    useEffect(() => {
        const urlparams = new URLSearchParams(window.location.search);
        const accessToken = urlparams.get(LOCAL_STORAGE_KEY.accessToken);
        const refreshToken = urlparams.get(LOCAL_STORAGE_KEY.refreshToken);

        if (accessToken) {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            // 리다이렉트 또는 상태 업데이트 등 추가 작업 수행
            window.location.href = "/my"; // 예: 홈 페이지로 리다이렉트
        }   
    }, [setAccessToken, setRefreshToken]);

  return (
    <div>
        <h1>Google Login Redirect Page</h1>
    </div>
  )
}

export default GoogleLoginRedirectPage;