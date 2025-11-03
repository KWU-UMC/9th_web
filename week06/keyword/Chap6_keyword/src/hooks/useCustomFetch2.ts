import { useQuery } from '@tanstack/react-query';

export const useCustomFetch = <T>(url: string) => {
  return useQuery({
    // 쿼리 키: 데이터를 식별하고 캐싱하는 고유 키
    // url이 같으면 같은 캐시를 공유하고, url이 다르면 별도로 관리
    queryKey: [url],

    // 쿼리 함수: 실제로 데이터를 가져오는 비동기 함수
    // React Query가 자동으로 signal을 제공하여 요청 취소 지원
    queryFn: async ({ signal }) => {
      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
      }

      return response.json() as Promise<T>;
    },

    // 재시도 설정: 실패 시 최대 3회 자동 재시도
    retry: 3,

    // 재시도 지연 시간: 지수 백오프 전략
    // 0회차: 1초, 1회차: 2초, 2회차: 4초 (최대 30초 제한)
    retryDelay: (attemptIndex) =>
      Math.min(1000 * Math.pow(2, attemptIndex), 30000),

    // 데이터 신선도 관리: 5분 동안은 네트워크 요청 없이 캐시 사용
    staleTime: 5 * 60 * 1000,

    // 가비지 컬렉션: 쿼리가 사용되지 않은 채로 10분이 지나면 캐시에서 제거
    gcTime: 10 * 60 * 1000,
  });
};