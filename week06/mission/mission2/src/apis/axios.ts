import axios, { type InternalAxiosRequestConfig } from "axios";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/v1",
});

let refreshPromise: Promise<string> | null = null;

// localStorage 헬퍼 함수
const getToken = (key: string): string | null => {
  const token = localStorage.getItem(key);
  return token ? JSON.parse(token) : null;
};

const setToken = (key: string, value: string | null) => {
  if (value === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getToken("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    // 401 에러이고, 재시도하지 않은 요청인 경우
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // refresh 요청 자체가 실패한 경우
      if (originalRequest.url === "/auth/refresh") {
        setToken("accessToken", null);
        setToken("refreshToken", null);
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // 이미 refresh 중이 아니면 새로 시작
      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const refreshToken = getToken("refreshToken");

            if (!refreshToken) {
              throw new Error("No refresh token");
            }

            const response = await axiosInstance.post("/auth/refresh", {
              refresh: refreshToken,
            });

            const newAccessToken = response.data.data.accessToken;
            const newRefreshToken = response.data.data.refreshToken;

            setToken("accessToken", newAccessToken);
            setToken("refreshToken", newRefreshToken);

            return newAccessToken;
          } catch (err) {
            setToken("accessToken", null);
            setToken("refreshToken", null);
            window.location.href = "/login";
            throw err;
          } finally {
            refreshPromise = null;
          }
        })();
      }

      // refresh 완료될 때까지 대기 => 재시도
      return refreshPromise.then((newAccessToken: string) => {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance.request(originalRequest);
      });
    }

    return Promise.reject(error);
  }
);
