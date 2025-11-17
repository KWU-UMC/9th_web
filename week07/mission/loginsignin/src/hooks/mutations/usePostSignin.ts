import { useMutation } from "@tanstack/react-query"
import { postSignin } from "../../apis/auth"
import { useLocalStorage } from "../useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { useAuth } from "../../context/AuthContext";

export const usePostSignin = () => {
  const {setItem: setAccessTokenFromStorage} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {setItem: setRefreshTokenFromStorage} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  const {setItem: setNameFromStorage} = useLocalStorage(LOCAL_STORAGE_KEY.name);
  const {setAccessToken, setRefreshToekn, setName} = useAuth();

  return useMutation({
    mutationFn: postSignin,
    onSuccess: (data) => {
      const newAccessToken = data.data.accessToken;
      const newRefreshToken = data.data.refreshToken;
      const newName = data.data.name;

      setAccessTokenFromStorage(newAccessToken);
      setRefreshTokenFromStorage(newRefreshToken);
      setNameFromStorage(newName);

      setAccessToken(newAccessToken);
      setRefreshToekn(newRefreshToken);
      setName(newName);
      alert("로그인 성공");
      window.location.href = "/";
    },
    onError: (error) => {
      console.error('로그인 오류', error);
      alert('로그인 실패');
    }
  })
}