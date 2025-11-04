import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { refreshAccessToken } from './auth';

export const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

// ... (request 인터셉터는 동일) ...

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest) {
      
      // 🚨 1번 방지: 실패한 요청이 'refresh' 자체인지 확인
      if (originalRequest.url === '/v1/auth/refresh') {
        console.error('Refresh Token이 유효하지 않아 강제 로그아웃됩니다.');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // 🚨 2번 방지: '일반 API'의 재시도인지 확인 (이게 _retry 플래그)
      // @ts-ignore
      if (originalRequest._retry) {
        console.error('토큰 재발급 후에도 401, 강제 로그아웃');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; 
        return Promise.reject(error);
      }
      
      // @ts-ignore
      originalRequest._retry = true; // '일반 API'에 재시도 플래그 달기

      try {
        const newAccessToken = await refreshAccessToken();

        localStorage.setItem('accessToken', newAccessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        return api(originalRequest);

      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);