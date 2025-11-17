// src/hooks/mutations/useCommentMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment, updateComment, deleteComment } from '../../apis/lps'; // ⭐️ lps.ts에서 가져옴

export const useCommentMutations = (lpid: string, order: 'recent' | 'oldest') => {
  const queryClient = useQueryClient();
  // ⭐️ 무효화할 쿼리 키 (LpDetailPage의 useInfiniteQuery 키와 동일해야 함)
  const queryKey = ['lpComments', lpid, order];

  // 1. 댓글 생성
  const createCommentMutation = useMutation({
    mutationFn: (content: string) => createComment({ lpid, content }),
    onSuccess: () => {
      // ⭐️ 댓글 생성 성공 시, 댓글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey });
      alert('댓글이 생성되었습니다! (Mock)');
    },
    onError: () => alert('댓글 생성 실패'),
  });

  // 2. 댓글 수정
  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateComment({ commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      alert('댓글이 수정되었습니다! (Mock)');
    },
    onError: () => alert('댓글 수정 실패'),
  });

  // 3. 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      alert('댓글이 삭제되었습니다! (Mock)');
    },
    onError: () => alert('댓글 삭제 실패'),
  });

  return {
    createComment: createCommentMutation.mutate,
    updateComment: updateCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate,
    isCreating: createCommentMutation.isPending,
    isUpdating: updateCommentMutation.isPending,
    isDeleting: deleteCommentMutation.isPending,
  };
};