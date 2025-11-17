import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants/key';
import { getLpDetail } from '../../apis/lp';
import type { RequestLpDto } from '../../types/lp';

export default function useGetLpDetail({lpId}: RequestLpDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lp, lpId],
    // 쿼리 함수: 실제로 데이터를 가져오는 비동기 함수
    queryFn: async () => {
      return await getLpDetail({lpId});
    },
    retry: 3,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    select: (data) => data.data,
  });
}