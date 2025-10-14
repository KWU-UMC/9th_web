import { useEffect, useRef, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

export function useCustomFetch<T>(
  url: string | null,
  {
    config,
    deps = [],
  }: {
    config?: AxiosRequestConfig;
    deps?: unknown[];
  } = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reqIdRef = useRef(0);

  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
    "Content-Type": "application/json;charset=utf-8",
    ...config?.headers,
  };

  useEffect(() => {
    if (!url) return;

    const id = ++reqIdRef.current;
    const controller = new AbortController();

    setPending(true);
    setError(null);

    axios
      .get<T>(url, { ...config, headers, signal: controller.signal })
      .then((res) => {
        if (id === reqIdRef.current) setData(res.data);
      })
      .catch((e: any) => {
        if (
          axios.isCancel?.(e) ||
          e?.code === "ERR_CANCELED" ||
          e?.name === "CanceledError"
        ) {
          return;
        }
        const msg =
          e?.response?.data?.status_message ??
          e?.message ??
          "데이터 요청 중 오류가 발생했습니다.";
        setError(msg);
      })
      .finally(() => {
        if (id === reqIdRef.current) setPending(false);
      });

    return () => controller.abort();
  }, [url, ...deps]);

  const refetch = () => {
    const tmp = reqIdRef.current;
    reqIdRef.current = tmp;
  };

  return { data, isPending, error, refetch } as const;
}