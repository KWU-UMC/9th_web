import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_BASE_URL, LS_KEYS, REFRESH_PATH, RETRY_FLAG } from "../constants/key";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = JSON.parse(localStorage.getItem(LS_KEYS.ACCESS) || "null");
  if (accessToken) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let requestQueue: Array<(token: string | null) => void> = [];

function onRefreshed(token: string | null) {
  requestQueue.forEach((cb) => cb(token));
  requestQueue = [];
}

type RefreshResponse = {
  status: boolean;
  statusCode: number;
  message: string;
  data: { id: number; name: string; accessToken: string; refreshToken?: string };
};

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = JSON.parse(localStorage.getItem(LS_KEYS.REFRESH) || "null");
  if (!refreshToken) return null;

  try {
    const resp = await axios.post<RefreshResponse>(
      `${API_BASE_URL}${REFRESH_PATH}`,
      { refresh: refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );

    if (!resp.data?.status) return null;

    const newAccess = resp.data.data.accessToken;
    const newRefresh = resp.data.data.refreshToken;

    localStorage.setItem(LS_KEYS.ACCESS, JSON.stringify(newAccess));
    if (newRefresh) localStorage.setItem(LS_KEYS.REFRESH, JSON.stringify(newRefresh));

    return newAccess;
  } catch (e) {
    console.error("🔴 refresh 실패:", e);
    return null;
  }
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const original = error.config as (AxiosRequestConfig & { [RETRY_FLAG]?: boolean }) | undefined;
    const status = error.response?.status;

    const isUnauthorized = status === 401;
    const isRefreshCall = original?.url?.includes(REFRESH_PATH);
    const alreadyRetried = original?.[RETRY_FLAG] === true;

    if (isUnauthorized && !isRefreshCall && !alreadyRetried) {
      if (original) original[RETRY_FLAG] = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          requestQueue.push((token) => {
            if (!token || !original) return reject(error);
            original.headers = original.headers ?? {};
            (original.headers as any).Authorization = `Bearer ${token}`;
            resolve(axiosInstance(original));
          });
        });
      }

      isRefreshing = true;
      try {
        const newToken = await refreshAccessToken();
        onRefreshed(newToken);
        isRefreshing = false;

        if (!newToken || !original) {
          localStorage.removeItem(LS_KEYS.ACCESS);
          localStorage.removeItem(LS_KEYS.REFRESH);
          return Promise.reject(error);
        }

        original.headers = original.headers ?? {};
        (original.headers as any).Authorization = `Bearer ${newToken}`;
        return axiosInstance(original);
      } catch (err) {
        isRefreshing = false;
        onRefreshed(null);
        localStorage.removeItem(LS_KEYS.ACCESS);
        localStorage.removeItem(LS_KEYS.REFRESH);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

