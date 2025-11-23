import { useMutation } from "@tanstack/react-query";
import { postLike, deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

export function useToggleLike() {
  const post = useMutation({
    mutationFn: (lpId: number) => postLike(lpId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
    },
  });

  const del = useMutation({
    mutationFn: (lpId: number) => deleteLike(lpId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
    },
  });

  return { post, del };
}
