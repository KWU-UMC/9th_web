import { useMutation } from "@tanstack/react-query"
import { patchComment } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

export const usePatchComment = () => {
  return useMutation({
    mutationFn: patchComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, data.data.lpId],
      });
    },
  });
}