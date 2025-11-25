import { useMutation } from "@tanstack/react-query"
import { postComment } from "../../apis/lp";

export const usePostComment = () => {
  return useMutation({
    mutationFn: postComment,
  });
}