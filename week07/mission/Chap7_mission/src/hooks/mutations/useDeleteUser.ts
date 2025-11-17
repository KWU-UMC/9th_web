import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '../../apis/auth';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import { useLocalStorage } from '../useLocalStorage';
import { useAuth } from '../useAuth';

export default function useDeleteUser() {
  const { setAccessToken: setContextAccessToken, setRefreshToken: setContextRefreshToken } = useAuth();
  const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // localStorage
      removeAccessToken();
      removeRefreshToken();

      // Context state
      setContextAccessToken(null);
      setContextRefreshToken(null);
    },
    onError: (error) => {
      console.error('회원 탈퇴 오류', error);
      alert('회원 탈퇴 실패');
    },
  });
}
