import { useMutation } from '@tanstack/react-query';
import { postLogout } from '../../apis/auth';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import { useLocalStorage } from '../useLocalStorage';

export default function useLogout() {
  const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const logoutMutation = useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      removeAccessToken();
      removeRefreshToken();
      alert('로그아웃 성공');
      window.location.href = "/";
    },
    onError: (error) => {
      console.error('로그아웃 오류', error);
      alert('로그아웃 실패');
    },
  });

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return { logout, logoutMutation };
}
