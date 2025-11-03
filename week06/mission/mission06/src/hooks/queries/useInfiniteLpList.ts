import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { PAGINATION_ORDER } from "../../enums/common";

type Params = { order: PAGINATION_ORDER; limit?: number; search?: string };

export const useInfiniteLpList = ({ order, limit = 24, search }: Params) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, order, search],
    queryFn: ({ pageParam }) =>
      getLpList({ order, limit, search, cursor: pageParam as number | undefined }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor ?? undefined : undefined),
    select: (data) => ({
      pages: data.pages.flatMap((p) => p.data.data),
      pageInfo: {
        hasNext: data.pages.at(-1)?.hasNext ?? false,
        nextCursor: data.pages.at(-1)?.nextCursor ?? null,
      },
    }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
