import { useMutation } from "@tanstack/react-query"
import { postSignout } from "../../apis/auth"
import { useLocalStorage } from "../useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { useAuth } from "../../context/AuthContext";

export const usePostSignout = () => {
  const {removeItem: removeAccessTokenFromStorage} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {removeItem: removeRefreshTokenFromStorage} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  const {removeItem: removeNameFromStorage} = useLocalStorage(LOCAL_STORAGE_KEY.name);
  const {setAccessToken, setRefreshToekn, setName} = useAuth();

  return useMutation({
    mutationFn: postSignout,
    onSuccess: () => {
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      removeNameFromStorage();

      setAccessToken(null);
      setRefreshToekn(null);
      setName(null);
      alert("로그아웃 성공");
      window.location.href = "/";
    },
    onError: (error) => {
      console.error('로그아웃 오류', error);
      alert('로그아웃 실패');
    }
  })
}