// src/hooks/useTmdbFetch.ts
import { useEffect, useMemo, useRef, useState } from "react";
import axios, { AxiosError } from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { accept: "application/json" },
});

function getToken() {
  const raw = import.meta.env.VITE_TMDB_TOKEN;
  const token = (typeof raw === "string" ? raw : "").trim();
  return token;
}

export type UseTmdbState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useTmdbFetch<T = unknown>(
  path: string,                 // e.g. "/discover/movie"
  params?: Record<string, any>, // TMDB 쿼리 파라미터
  deps: any[] = []              // 의존성(변하면 자동 재요청)
): UseTmdbState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 토큰/옵션 메모
  const config = useMemo(() => {
    const token = getToken();
    return {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      params,
    };
  }, [JSON.stringify(params)]); // params 객체는 JSON-stringify로 의존성 관리

  const abortRef = useRef<AbortController | null>(null);

  const fetchOnce = async () => {
    // 이전 요청 취소
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const res = await tmdb.get<T>(path, {
        ...config,
        signal: controller.signal,
      });
      setData(res.data);
    } catch (e) {
      const err = e as AxiosError;
      if (axios.isCancel(err)) return; // 취소된 요청이면 무시
      if ((err as any)?.code === "ERR_CANCELED") return;

      if (err.response?.status === 401) {
        setError("인증 실패(401): TMDB 토큰을 확인하세요 (.env의 VITE_TMDB_TOKEN).");
      } else {
        setError("요청 실패: 네트워크 상태 또는 API 파라미터를 확인하세요.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // mount & deps 변경 시 자동 재요청
  useEffect(() => {
    fetchOnce();
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, config, ...deps]);

  return { data, loading, error, refetch: fetchOnce };
}
