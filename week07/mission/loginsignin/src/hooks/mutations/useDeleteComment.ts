import { useMutation } from "@tanstack/react-query"
import { deleteComment } from "../../apis/lp";

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: deleteComment,
    // 여기 onSuccess는 Comment.tsx에서 추가
  });
}