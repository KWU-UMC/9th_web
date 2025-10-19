import { useEffect, useState } from "react";
import axios from "axios";

interface UseCustomFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

function useCustomFetch<T>(url: string): UseCustomFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
        });

        setData(response.data);
      } catch (err) {
        setError("데이터를 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default useCustomFetch;
