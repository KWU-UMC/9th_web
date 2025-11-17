import { useMutation } from "@tanstack/react-query"
import { deleteUser } from "../../apis/auth"
import { useLocalStorage } from "../useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { useAuth } from "../../context/AuthContext";

export const useDeleteUser = () => {
  const {removeItem: removeAccessTokenFromStorage} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {removeItem: removeRefreshTokenFromStorage} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  const {removeItem: removeNameFromStorage} = useLocalStorage(LOCAL_STORAGE_KEY.name);
  const {setAccessToken, setRefreshToekn, setName} = useAuth();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      removeNameFromStorage();

      setAccessToken(null);
      setRefreshToekn(null);
      setName(null);
      window.location.href = "/login";
    }
  })
}