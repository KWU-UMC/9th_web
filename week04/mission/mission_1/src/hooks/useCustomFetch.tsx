import { useState, useEffect } from 'react';

// .env.local 파일에서 Vite 환경 변수를 가져옵니다.
const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

// API 응답 상태를 위한 인터페이스 정의
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useCustomFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 의존성 배열의 url이 변경될 때마다 이전 상태를 초기화합니다.
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      // API_TOKEN이 없으면 에러를 발생시키고 중단합니다.
      if (!API_TOKEN) {
        setError(new Error('.env.local 파일에 VITE_TMDB_API_TOKEN이 설정되지 않았습니다.'));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP 에러! 상태: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        } else {
          setError(new Error('알 수 없는 오류가 발생했습니다.'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [url]); // url이 바뀔 때마다 이 useEffect 훅을 다시 실행합니다.

  return { data, loading, error };
}

export default useCustomFetch;