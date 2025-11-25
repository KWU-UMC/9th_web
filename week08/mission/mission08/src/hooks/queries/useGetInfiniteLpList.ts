import { useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import type { PAGINATION_ORDER } from "../../enums/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseLpListDto } from "../../types/lp";

type QueryKeyType = [string, PAGINATION_ORDER, ["search", string]];
type InfiniteLpOptions = Omit<
  UseInfiniteQueryOptions<ResponseLpListDto, Error, ResponseLpListDto, QueryKeyType, number>,
  "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
>;

export const useGetInfiniteLpList = (
  limit: number,
  search: string,
  order: PAGINATION_ORDER,
  options: InfiniteLpOptions = {}
) => {
  return useInfiniteQuery<ResponseLpListDto, Error, ResponseLpListDto, QueryKeyType, number>({
    queryFn: ({ pageParam }) => getLpList({ cursor: pageParam, limit, search, order }),
    queryKey: [QUERY_KEY.lps, order, ["search", search]],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    staleTime: 1000 * 10,
    gcTime: 1000 * 60 * 5,
    ...options,
  });
};
