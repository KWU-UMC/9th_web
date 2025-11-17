import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { patchLp } from "../../apis/lp";
import type { RequestPatchLpDto } from "../../types/lp";

type Variables = {
  lpId: string;
  body: RequestPatchLpDto
};

export default function usePatchLp() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ lpId, body }: Variables) => patchLp(lpId, body),
        onSuccess: () => {
            // LP 목록 쿼리를 무효화하여 자동 새로고침
            qc.invalidateQueries({ 
                queryKey: [QUERY_KEY.lp],
            })
        },
    })
}

// export type RequestPatchLpDto = {
//   title: string;
//   content: string;
//   thumbnail: string;
//   tags: string[]; // 문자열 배열로 전송
//   published: boolean;
// };