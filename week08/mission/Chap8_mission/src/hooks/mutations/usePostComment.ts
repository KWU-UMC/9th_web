import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { LpComment } from "../../types/lp";

type Variables = {
  lpId: string;
  content: string;
};

export default function usePostComment() {
    const qc = useQueryClient();

    return useMutation<LpComment, unknown, Variables>({
        mutationFn: ({ lpId, content }) => postComment(lpId, { content }),
        onSuccess: () => {
            qc.invalidateQueries({ 
                queryKey: [QUERY_KEY.lpComments], 
            })
        },
    })
}