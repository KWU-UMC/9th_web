import { useState, useEffect } from "react";
// 커스텀 훅: 데이터 패칭을 위한 훅
// URL을 인자로 받아 데이터를 가져오고 로딩 상태와 에러 상태를 관리
// 사용법: const { data, loading, error } = useCustomFetch('https://api.example.com/data');

export const useCustomFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("데이터를 불러올 수 없습니다.");
        return res.json();
      })
      .then(data => setData(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]); // URL이 바뀌면 자동으로 재요청

  return { data, loading, error }; //데이터, 로딩, 에러 상태 반환
};
