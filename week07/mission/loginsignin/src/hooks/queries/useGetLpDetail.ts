import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { RequestLpDto } from "../../types/lp";

export const useGetLpDetail = ({lpId}: RequestLpDto) => {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetail({lpId}),
    // 5분 동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄인다
    staleTime: 1000 * 60 * 5,
    // 10분 동안 사용되지 않은면 해당 캐시 데이터가 삭제되며, 다시 요청 시 새 데이터를 받아옵니다
    gcTime: 1000 * 60 * 10,
    select: (data) => data.data
  });
}