import { useState, useCallback } from 'react';

export const useCustomFetch = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (url: string, params?: Record<string, string | number | boolean>) => {
    setIsLoading(true);
    setError(null);
    try {
      const queryString = params 
        ? '?' + new URLSearchParams(params as Record<string, string>).toString() 
        : '';
      
      const response = await fetch(`${url}${queryString}`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('데이터를 불러오는데 실패했습니다.');
      }

      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchData };
};