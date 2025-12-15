import { useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";


const GoogleUserInformation = () => {
  const [searchParams] = useSearchParams();
  const {setItem: setItemAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {setItem: setItemRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  const {setItem: setItemName} = useLocalStorage(LOCAL_STORAGE_KEY.name);

  useEffect(() => {
    setItemAccessToken(searchParams.get(LOCAL_STORAGE_KEY.accessToken));
    setItemRefreshToken(searchParams.get(LOCAL_STORAGE_KEY.refreshToken));
    setItemName(searchParams.get(LOCAL_STORAGE_KEY.name));
    window.location.href = "/";
  }, [searchParams, setItemAccessToken, setItemRefreshToken, setItemName]);

  return (
    <div>
      
    </div>
  )
}

export default GoogleUserInformation