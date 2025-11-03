import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpComments } from "../../apis/comments";
import { QUERY_KEY } from "../../constants/key";
import type { PAGINATION_ORDER } from "../../enums/common";

type Params = { lpId: string; order: PAGINATION_ORDER; limit?: number };

export const useInfiniteComments = ({ lpId, order, limit = 20 }: Params) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, "comments", lpId, order],
    queryFn: ({ pageParam }) => getLpComments(lpId, { order, limit, cursor: pageParam as number | undefined }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (last) => (last.hasNext ? last.nextCursor ?? undefined : undefined),
    select: (data) => ({
      items: data.pages.flatMap((p) => p.data.data),
      hasNext: data.pages.at(-1)?.hasNext ?? false,
    }),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
  });
