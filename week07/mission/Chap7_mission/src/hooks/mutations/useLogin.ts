import { useMutation } from '@tanstack/react-query';
import { postSignin } from '../../apis/auth';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import { useLocalStorage } from '../useLocalStorage';
import type { RequestSigninDto } from '../../types/auth';
import { useAuth } from '../useAuth';

export default function useLogin() {
  const { setAccessToken: setContextAccessToken, setRefreshToken: setContextRefreshToken } = useAuth();
  const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const loginMutation = useMutation({
    mutationFn: (signInData: RequestSigninDto) => postSignin(signInData),
    onSuccess: (response) => {
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      // localStorage
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      // Context state
      setContextAccessToken(accessToken);
      setContextRefreshToken(refreshToken);


    },
    onError: (error) => {
      console.error('로그인 오류', error);
      alert('로그인 실패');
    },
  });

  const login = async (signInData: RequestSigninDto) => {
    await loginMutation.mutateAsync(signInData);
  };

  return { login, loginMutation };
}
