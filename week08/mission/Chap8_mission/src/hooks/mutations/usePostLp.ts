import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { postCreateLp } from "../../apis/lp";
import type { ResponseCreateLpDto, RequestCreateLpDto } from "../../types/lp";

export default function usePostLp() {
    const qc = useQueryClient();

    return useMutation<ResponseCreateLpDto, Error, RequestCreateLpDto>({
        mutationFn: postCreateLp,
        onSuccess: () => {
            // LP 목록 쿼리를 무효화하여 자동 새로고침
            qc.invalidateQueries({ 
                queryKey: [QUERY_KEY.lps],
                exact:false, // // order 등 추가 파라미터가 포함된 key까지 모두 갱신됨
            })
        },
    })
}