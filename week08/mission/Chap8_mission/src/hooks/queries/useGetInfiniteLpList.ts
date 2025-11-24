import { useInfiniteQuery } from "@tanstack/react-query"
import type { PAGINATION_ORDER } from "../../enums/common"
import { getLpList } from "../../apis/lp"
import { QUERY_KEY } from "../../constants/key";

export const useGetInfiniteLpList = (
    limit: number, 
    search: string, 
    order: PAGINATION_ORDER,
    options = {}
) => {
        return useInfiniteQuery({
                queryFn: ({pageParam}) => getLpList({cursor: pageParam, limit, search, order}),
                queryKey: [QUERY_KEY.lps, order, search],
                initialPageParam: 0,
                // 마지막 페이지 데이터를 바탕으로 다음 페이지의 pageParam 값을 결정하는 함수
                getNextPageParam: (lastPage) => {
                    return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
                },
                
                staleTime: 1000 * 10,  // 10초 동안 stale 아님
                gcTime: 1000 * 60 * 5, // 5분
                ...options,
            });
        }