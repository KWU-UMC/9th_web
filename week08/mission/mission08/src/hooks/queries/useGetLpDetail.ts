import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { RequestLpDto } from "../../types/lp";

export const useGetLpDetail = ({lpId}: RequestLpDto) => {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetail({lpId}),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: (data) => data.data
  });
}