import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants/key';
import { getLpList } from '../../apis/lp';
import type { PaginationDto } from '../../types/common';
// import type { ResponseLpListDto } from '../../types/lp';

// const initialLpListData: ResponseLpListDto = {
//   status: true,
//   statusCode: 200,
//   message: "",
//   data: {
//     data:[],
//   }, 
//   nextCursor: 0,
//   hasNext: false
// };

export default function useGetLpList({cursor, search, order, limit}: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, order],
    // 쿼리 함수: 실제로 데이터를 가져오는 비동기 함수
    queryFn: async () => {
      return await getLpList({ cursor, search, order, limit });
    },

    // 재시도 설정: 실패 시 최대 3회 자동 재시도
    retry: 3,
    // 재시도 지연 시간: 지수 백오프 전략
    // // 0회차: 1초, 1회차: 2초, 2회차: 4초 (최대 30초 제한)
    // retryDelay: (attemptIndex) =>
    //   Math.min(1000 * Math.pow(2, attemptIndex), 30000),

    // 데이터 신선도 관리: 5분 동안은 네트워크 요청 없이 캐시 사용
    staleTime: 5 * 60 * 1000,

    // 가비지 컬렉션: 쿼리가 사용되지 않은 채로 10분이 지나면 캐시에서 제거
    gcTime: 10 * 60 * 1000,
    // enabled: Boolean(search),
    // initialData: initialLpListData,
  });
}