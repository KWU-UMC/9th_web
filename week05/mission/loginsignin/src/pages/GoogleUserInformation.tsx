import { useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";


const GoogleUserInformation = () => {
  const [searchParams] = useSearchParams();
  const {setItem: setItemAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {setItem: setItemRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  useEffect(() => {
    setItemAccessToken(searchParams.get(LOCAL_STORAGE_KEY.accessToken));
    setItemRefreshToken(searchParams.get(LOCAL_STORAGE_KEY.refreshToken));
    window.location.href = "/";
  }, [searchParams, setItemAccessToken, setItemRefreshToken]);

  return (
    <div>
      
    </div>
  )
}

export default GoogleUserInformation
