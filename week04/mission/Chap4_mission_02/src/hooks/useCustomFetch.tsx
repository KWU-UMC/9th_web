import { useEffect, useState } from "react";
import axios from "axios";

function useCustomFetch<TResponse, TData>(
  url: string | null,
  selector: (response: TResponse) => TData,
  deps: unknown[] = []
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
  }, deps);

  return { data, isLoading, isError };
}

export default useCustomFetch;