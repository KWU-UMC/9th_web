import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseLpListDto } from "../../types/lp";
import useDebounce from "../useDebounce";

function useGetInfiniteGetLpList(limit: number, search: string, order: PAGINATION_ORDER) {
  const debouncedSearch = useDebounce(search, 300);

  return useInfiniteQuery<ResponseLpListDto, Error>({
    queryKey: [QUERY_KEY.lps, debouncedSearch, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpList({ cursor: pageParam, limit, debouncedSearch, order }),
    getNextPageParam: (lastPage) => lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
  });
}

export default useGetInfiniteGetLpList;
