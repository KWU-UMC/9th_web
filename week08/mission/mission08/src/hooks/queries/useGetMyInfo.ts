import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../constants/key"
import { getMyInfo } from "../../apis/auth"

export const useGetMyInfo = (accessToken:string | null) => {
  return useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    enabled: !!accessToken,
    select: (data) => data.data
  })
}