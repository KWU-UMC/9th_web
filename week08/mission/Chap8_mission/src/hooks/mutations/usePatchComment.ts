import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchComment } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

type Variables = {
  lpId: string;
  commentId: number;
  content: string;
};

export default function  usePatchComment() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ lpId, commentId, content }: Variables) => patchComment(lpId, commentId, { content }),
        onSuccess: () => {
            qc.invalidateQueries({ 
                queryKey: [QUERY_KEY.lpComments], 
            })
        },
    })
}

// export const patchComment = async (lpId: string | undefined, commentId:number, body: { content: string }):Promise<ResponsePatchLpCommentDto> => {
//   const { data } = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, body);
//   return data;
// };