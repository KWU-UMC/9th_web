import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { deleteLp } from "../../apis/lp";

type Variables = {
  lpId: string;
};

export default function useDeleteLp() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ lpId }: Variables) => deleteLp(lpId),
        onSuccess: () => {
            // LP 목록 쿼리를 무효화하여 자동 새로고침
            qc.invalidateQueries({ 
                queryKey: [QUERY_KEY.lps],
            })
        },
    })
}