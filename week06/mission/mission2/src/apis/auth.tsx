import { api } from './axios';

// 로그인 API
export const loginUser = async (loginData: any) => {
  const response = await api.post('/v1/auth/signin', loginData);
  return response.data;
};

// 토큰 재발급 API
export const refreshAccessToken = async () => {
  const token = localStorage.getItem('refreshToken');

  const response = await api.post(
    '/v1/auth/refresh', 
    { refresh: token } 
  );
  
  return response.data.data.accessToken; 
};

// (테스트용) 토큰이 필요한 API
export const getMyPageInfo = async () => {
  const response = await api.get('/v1/users/me'); 
  return response.data;
}

// 회원가입 API
export const signupUser = async (signupData: any) => {
  const response = await api.post('/v1/auth/signup', signupData);
  return response.data;
};