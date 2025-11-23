import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseLpListDto } from "../../types/lp";

function useGetInfiniteGetLpList(limit: number, search: string, order: PAGINATION_ORDER) {
  
  return useInfiniteQuery<ResponseLpListDto, Error>({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpList({ cursor: pageParam, limit, search, order }),
    getNextPageParam: (lastPage) => lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
  });
}

export default useGetInfiniteGetLpList;
