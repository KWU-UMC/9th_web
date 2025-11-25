import { useMutation } from "@tanstack/react-query"
import { postLike } from "../../apis/lp"
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

export const usePostLike = () => {
  return useMutation({
    mutationFn: postLike,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
    },
  });
}