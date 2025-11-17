import { useInfiniteQuery } from "@tanstack/react-query";
import type { CommentsDto } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";
import { getLpCommentsList } from "../../apis/lp";

export const useGetInfiniteLpComments = ({lpId, limit, order}:CommentsDto) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lpComments, lpId, order],
    queryFn: ({pageParam}) => getLpCommentsList({lpId, cursor: pageParam, limit, order}),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    }
  });
};