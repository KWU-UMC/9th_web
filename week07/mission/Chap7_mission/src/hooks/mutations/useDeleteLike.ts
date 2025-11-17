import { deleteLike } from "../../apis/lp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import type { RequestLpDto, ResponseLpDetailDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";

export default function useDeleteLike() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteLike,

    // 낙관적 업데이트
    onMutate: async ({ lpId }: RequestLpDto) => {
      // 1) 이 LP의 refetch 중단
      await qc.cancelQueries({ queryKey: [QUERY_KEY.lp, lpId] });

      // 2) 기존 데이터 저장
      const prev = qc.getQueryData<ResponseLpDetailDto>([
        QUERY_KEY.lp,
        lpId,
      ]);
      const prevLikes = prev?.data.likes ?? [];

      // 3) 내 userId
      const me = qc.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
      const userId = Number(me?.data.id);

      // 4) 좋아요 해제 로직 (toggle 아님 → 삭제 전용)
      const nextLikes = prevLikes.filter((l) => l.userId !== userId);

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

      // 6) 캐시 업데이트
      qc.setQueryData([QUERY_KEY.lp, lpId], next);

      return { prev, lpId };
    },

    // 실패 → 롤백
    onError: (_err, _variables, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData([QUERY_KEY.lp, ctx.lpId], ctx.prev);
      }
      alert("좋아요 취소에 실패했습니다. 다시 시도해주세요.");
    },

    // 성공/실패와 관계없이 refetch
    onSettled: (_data, _error, variables) => {
      qc.invalidateQueries({
        queryKey: [QUERY_KEY.lp, variables.lpId],
      });
    },
  });
}