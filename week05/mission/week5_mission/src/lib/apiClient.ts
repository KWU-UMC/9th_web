// src/lib/apiClient.ts
import axios, { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";

/**
 * 우리가 쓸 Axios 인스턴스
 */
const api = axios.create({
  baseURL: "http://localhost:8000/v1", // <- 너희 서버 주소에 맞춰서
  withCredentials: true, // refreshToken을 쿠키로 받는 경우 true 유지
});

/**
 * 1) 요청 인터셉터
 * - 모든 요청마다 accessToken을 Authorization 헤더에 실어준다.
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && config.headers) {
      // Bearer {token}
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

/**
 * 2) 응답 인터셉터
 * - 401 나오면: accessToken 만료라고 보고 refresh 요청
 * - refresh 성공하면: 새로운 accessToken 저장하고, 실패했던 요청을 다시 시도
 * - 무한루프 방지를 위해 originalRequest._retry 사용
 */

// _retry 필드를 RequestConfig에 추가로 붙여서 타입에러 안 나게 돌려줌
type RetriableRequestConfig = AxiosRequestConfig & { _retry?: boolean };

api.interceptors.response.use(
  // 성공 응답은 그대로 리턴
  (response) => response,

  // 에러 응답 처리
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    // originalRequest가 없으면(이상한 에러면) 그냥 실패시켜
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // 조건:
    // - 서버가 401을 줬다 (Unauthorized)
    // - 아직 retry하지 않았다
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // refresh 요청
        // refreshToken을 httpOnly 쿠키로 준다는 가정이면 body는 비워도 되고
        // 만약 refreshToken을 localStorage에 저장했다면 그 값도 함께 보내줘야 함.
        const refreshResponse = await axios.post(
          "http://localhost:8000/v1/auth/refresh",
          {},
          { withCredentials: true } // 쿠키 보내려면 필요
        );

        // 서버가 새로운 accessToken을 내려준다고 가정
        const newAccessToken = (refreshResponse.data as any)?.accessToken;

        if (!newAccessToken) {
          // 새 토큰 못 받으면 그냥 로그인 요구로 처리
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // 1) 새 accessToken을 저장
        localStorage.setItem("accessToken", newAccessToken);

        // 2) 실패했던 요청 헤더 갱신
        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 3) 같은 인스턴스로 재요청
        return api(originalRequest);
      } catch (refreshErr) {
        // refresh도 실패하면 -> 로그인 만료 처리
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    // 여기로 오면:
    // - 401이 아닌 다른 에러거나
    // - 이미 retry 했는데도 또 401 난 경우
    return Promise.reject(error);
  }
);

export default api;
