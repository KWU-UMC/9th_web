import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/auth";
import type { RequestMyInfoDto, ResponseMyInfoDto } from "../../types/auth";
import { QUERY_KEY } from "../../constants/key";

// 내 정보 조회
// export type ResponseMyInfoDto = CommonResponse<{
//   id: number;
//   name: string;
//   email: string;
//   bio: string | null;
//   avatar: string | null;
//   createdAt: Date;
//   updatedAt: Date;
// }>;

// export type RequestMyInfoDto = {
//   name: string;
//   bio: string | null;
//   avatar: string | null;
// }

export default function usePatchMyInfo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: patchMyInfo,

    // 낙관적 업데이트
    onMutate: async (updatedInfo: RequestMyInfoDto) => {
      await qc.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

      const prev = qc.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
      const prevData = prev?.data;

      // 기존 데이터를 기반으로 새로운 값 생성
      const next = prevData
        ? {
            ...prev,
            data: {
              ...prevData,
              ...updatedInfo, // name, bio, avatar만 업데이트
            },
          }
        : prev;

      qc.setQueryData([QUERY_KEY.myInfo], next);

      return { prev };
    },

    // 실패 → 롤백
    onError: (_err, _newInfo, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData([QUERY_KEY.myInfo], ctx.prev);
      }
      alert("프로필 수정에 실패했습니다. 다시 시도해주세요.");
    },

    // 성공, 실패 상관없이 refetch
    onSettled: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}