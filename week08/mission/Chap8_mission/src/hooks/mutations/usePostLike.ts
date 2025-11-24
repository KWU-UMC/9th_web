import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { RequestLpDto, ResponseLpDetailDto, Likes } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";

export default function usePostLike() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postLike,

    // 낙관적 업데이트
    onMutate: async ({ lpId }: RequestLpDto) => {
      // 1) 해당 LP 쿼리 중단
      await qc.cancelQueries({ queryKey: [QUERY_KEY.lp, lpId] });

      // 2) 기존 데이터 스냅샷
      const prev = qc.getQueryData<ResponseLpDetailDto>([
        QUERY_KEY.lp,
        lpId,
      ]);
      const prevLikes = prev?.data.likes ?? [];

      // 3) 내 ID
      const me = qc.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
      const userId = Number(me?.data.id);

      // 4) 좋아요 토글
      const isLiked = prevLikes.some((l) => l.userId === userId);
      const nextLikes = isLiked
        ? prevLikes.filter((l) => l.userId !== userId)
        : [...prevLikes, { userId, lpId } as Likes];

      // 5) next 데이터 생성
      const next = prev
        ? {
            ...prev,
            data: {
              ...prev.data,
              likes: nextLikes,
            },
          }
        : prev;

      // 6) 쿼리 업데이트
      qc.setQueryData([QUERY_KEY.lp, lpId], next);

      return { prev, lpId };
    },

    // 실패 → 롤백
    onError: (_err, _variables, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData([QUERY_KEY.lp, ctx.lpId], ctx.prev);
      }
      alert("좋아요 처리에 실패했습니다. 다시 시도해주세요.");
    },

    // 성공/실패 상관없이 refetch
    onSettled: (_data, _error, variables) => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.lp, variables.lpId] });
    },
  });
}