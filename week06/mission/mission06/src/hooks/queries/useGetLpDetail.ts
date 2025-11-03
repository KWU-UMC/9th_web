import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export const useGetLpDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEY.lps, id],
    queryFn: () => getLpDetail(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: (data) => data.data
  });
}