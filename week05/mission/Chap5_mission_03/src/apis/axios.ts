import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // 요청 재시도 여부를 나타내는 플래그
  
}

// 전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지
let refreshPromise:Promise<string | null> = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// 요청 인터셉터 설정: 모든 요청 전에 accessToken을 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
  const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const token = getItem(); // 로컬 스토리지에서 토큰 가져오기

  // accessToken이 존재하면 authorization 헤더에 bearer 토큰으로 추가
  if(token){
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`; // 헤더에 토큰 추가
  }

  // 수정된 config 객체 반환
  return config;
},
// 요청 에러 처리
(error) => {
  return Promise.reject(error);
}
);

// 응답 인터셉터: 401 에러 발생 시 토큰 갱신 시도
axiosInstance.interceptors.response.use(
  // 정상 응답 처리
  (response) => {
    return response;
  },
  // 에러 응답 처리
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config as CustomInternalAxiosRequestConfig;

    // 401 에러이면서 재시도 플래그가 설정되지 않은 경우에만 토큰 갱신 시도
    if (
      error.response &&
      error.response.status === 401 && 
      !originalRequest._retry) {
        // refresh 엔드포인트 401 에러가 발생한 경우 (unauthorized), 중복 재시도 방지를 위해 로그아웃 처리
        if(originalRequest.url === '/v1/auth/refresh'){
          const {removeItem: removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
          const {removeItem: removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
          removeAccessToken();
          removeRefreshToken();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // 재시도 플래그 설정
        originalRequest._retry = true;

        // 이미 refresh 요청이 진행 중인 경우, 기존 Promise를 반환하여 중복 요청 방지
        if (!refreshPromise) {
          // refresh 요청 실행후, 프라미스를 전역 변수에 할당
          refreshPromise = (async () => {
            const {getItem: getRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
            const refreshToken = getRefreshToken();
            
            const {data} = await axiosInstance.post('/v1/auth/refresh', {
              refresh: refreshToken,
            });
            // 갱신된 토큰을 로컬 스토리지에 저장
            const {setItem: setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            const {setItem: setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);
            
            // 새로운 accessToken 반환
            return data.data.accessToken;
        })()
        .catch(error => {
          const {removeItem: removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
          const {removeItem: removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
          removeAccessToken();
          removeRefreshToken();
        }).finally(() => {
          refreshPromise = null; // 요청 완료 후 프라미스 초기화
        });
    }

    // 진행 중인 refreshPromise가 해결될 때까지 기다림
    return refreshPromise.then((newAccessToken) => {
      // 원본 요청의 Authorization 헤더를 갱신된 토큰으로 업데이트
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

      return axiosInstance.request(originalRequest);
    })
    
    return Promise.reject(error);
  }
}
);