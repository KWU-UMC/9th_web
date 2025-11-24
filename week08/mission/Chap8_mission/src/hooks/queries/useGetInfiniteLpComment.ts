import { useInfiniteQuery } from "@tanstack/react-query"
import { getLpComments } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { CommentPaginationDto } from "../../types/common";

export const useGetInfiniteLpComment = ({ lpId, limit, order}:CommentPaginationDto ) => 
    {
        return useInfiniteQuery({
            queryKey: [QUERY_KEY.lpComments, lpId, order],
            queryFn: ({pageParam}) => getLpComments({lpId, cursor: pageParam, limit, order}),
            initialPageParam: 0,
            // 마지막 페이지 데이터를 바탕으로 다음 페이지의 pageParam 값을 결정하는 함수
            getNextPageParam: (lastPage) => {
                return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
                }
            });
    }