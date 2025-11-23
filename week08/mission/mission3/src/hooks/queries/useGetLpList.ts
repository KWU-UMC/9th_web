// hooks/queries/useGetLpList.ts
import { useQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PagenationDto } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ cursor, search, order, limit }: PagenationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 50 * 10,
    refetchInterval: 100 * 60,
    select: (data) => data.data.data,
  });
}

export default useGetLpList;
