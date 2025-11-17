import { useMutation } from "@tanstack/react-query"
import { patchLp } from "../../apis/lp"
import { queryClient } from "../../App"
import { QUERY_KEY } from "../../constants/key"

export const usePatchLp = () => {
  return useMutation({
    mutationFn: patchLp,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
        exact: true,
      })
    }
  })
}