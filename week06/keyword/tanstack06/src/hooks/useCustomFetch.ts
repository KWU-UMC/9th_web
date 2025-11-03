import { useQuery } from "@tanstack/react-query"

export const useCustomFetch = <T>(url: string) => {
  return useQuery({
    queryKey: [url],

    queryFn: async({signal}): Promise<T>=> {
      const response = await fetch(url, {signal});

      if(!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return response.json() as Promise<T>;
    },
    retry: 3,
    // 지수 백오프 전략
    // 1 -> 2 -> 4 -> 8 -> 16 -> 30 -> 30
    retryDelay: (attemptIndex): number => {
      return Math.min(1000* Math.pow(2, attemptIndex), 30_000);
    },
    staleTime: 5 * 60 * 1_000,
    // 쿼리가 사용되지 않은 채로 10분이 지나면 캐시에서 제거된다
    gcTime: 10*60*1_000,
  });
};

// import { useEffect, useMemo, useRef, useState } from "react";

// const STALE_TIME = 5 * 60 *1_000; // 5분

// const MAX_RETRIES = 3;
// // 1초마다 재시도
// const INITIAL_RETRY_DELAY = 1_000;

// // 로컬 스토리지에 저장할 데이터의 구조
// interface CacheEntry<T>{
//   data: T;
//   lastFetched: number; // 마지막으로 데이터를 가져온 시점 타임스탬프
// }

// export const useCustomFetch = <T>(url: string): {data: T | null; isPending: boolean; isError: boolean} => {
//   const [data, setData] = useState<T | null>(null);
//   const [isPending, setIsPending] = useState(false);
//   const [isError, setIsError] = useState(false);

//   const storageKey = useMemo((): string => url, [url]);

//   const abortControllerRef = useRef<AbortController | null>(null);

//   const retryTimeoutRef = useRef<number | null>(null);
  
//   useEffect((): void => {
//     abortControllerRef.current = new AbortController();

//     const fetchData = async(currentRetry = 0): Promise<void> => {
//       const currentTime = new Date().getTime();
//       const cachedItem = localStorage.getItem(storageKey); // url 기반 저장

//       // 캐시 데이터 확인, 신선도 검증
//       if(cachedItem){
//         try{
//           const cachedData: CacheEntry<T> = JSON.parse(cachedItem);

//           if(currentTime - cachedData.lastFetched < STALE_TIME){
//             setData(cachedData.data);
//             setIsPending(false);
//             console.log('캐시되 데이터 사용', url);
//             return;
//           }
//           //캐시가 만료된 경우
//           setData(cachedData.data);
//           console.log('만료된 캐시 데이터 사용', url);
//         } catch {
//           localStorage.removeItem(storageKey);
//           console.warn('캐시 에러: 캐시 삭제됨', url);
//         }
//       }

//       setIsPending(true);
//       try{
//         const response = await fetch(url, {
//           signal: abortControllerRef.current?.signal,
//         });

//         if (!response.ok){
//           throw new Error('Failed to fetch data');
//         }

//         const newData = (await response.json()) as T;
//         setData(newData);

//         const newCAcheEntry: CacheEntry<T> ={
//           data: newData,
//           lastFetched: new Date().getTime(), //현재 시간을 타임스탬프로 저장
//         };

//         localStorage.setItem(storageKey, JSON.stringify(newCAcheEntry));
//       } catch(error){
//         if(error instanceof Error && error.name === 'AbortError'){
//           console.log('요청 취소됨', url);
//           return;
//         }

//         if(currentRetry < MAX_RETRIES) {
//           // 1초 -> 2초 -> 4초 -> 8초
//           const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);
//           console.log(`재시도 ${currentRetry + 1}/${MAX_RETRIES} Retrying ${retryDelay}ms later`);

//           retryTimeoutRef.current = setTimeout((): void => {
//             fetchData(currentRetry + 1);
//           }, retryDelay);
//         } else {
//           setIsError(true);
//           setIsPending(false);
//           console.log('최대 재시도 횟수 초과', url);
//         }

//         setIsError(true);
//         console.error(error);
//       } finally{
//         setIsPending(false);
//       }
//     }

//     fetchData();

//     return (): void => {
//       abortControllerRef.current?.abort();

//       // 예약된 재시도 타이머 취소
//       if (retryTimeoutRef.current !== null){
//         clearTimeout(retryTimeoutRef.current);
//         retryTimeoutRef.current = null;
//       }
//     };
//   }, [url, storageKey]);

//   return {data, isPending, isError};
// }