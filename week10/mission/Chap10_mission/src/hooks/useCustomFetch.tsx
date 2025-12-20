import { useEffect, useState } from "react";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

function useCustomFetch<TResponse, TData>(
  url: string | null,
  options: AxiosRequestConfig = {},
  selector: (response: TResponse) => TData,
) {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) return; // url이 없을 경우 요청하지 않음

    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get<TResponse>(url, {
          ...options,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setData(selector(response.data));
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [options, url]);

  return { data, isLoading, isError };
}

export default useCustomFetch;
