import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({cursor,search,order,limit}:PaginationDto){

    return useQuery({
        queryKey:[QUERY_KEY.lps,search,order],
        queryFn:()=>getLpList({
            cursor,
            search,
            order,
            limit,
        }),//외부에서 받아와야하면 콜백으로

        //데이터가 신선하다고 간주하는 시간, 캐시된 데이터 그대로 사용
        staleTime: 1000*60*5,

        //비활성 상태인 쿼리 데이터가 캐시에 남아있는 시간
        //staleTime이 지나고도 메모리에 보관하고 gcTime 지나면 제거함
        gcTime:1000*60*10,

        select:(data)=>data.data.data,
    });
}

export default useGetLpList;