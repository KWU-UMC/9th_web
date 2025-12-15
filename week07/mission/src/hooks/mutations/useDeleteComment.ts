import { useMutation } from "@tanstack/react-query"
import { deleteComment } from "../../apis/lp";

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: deleteComment,
  });
}