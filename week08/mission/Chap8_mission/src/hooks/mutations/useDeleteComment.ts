import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

type Variables = {
  lpId: string;
  commentId: number;
};

export default function useDeleteComment() {
   const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ lpId, commentId }: Variables) => deleteComment(lpId, commentId),
        onSuccess: () => {
            qc.invalidateQueries({ 
                queryKey: [QUERY_KEY.lpComments], 
            })
        },
    })
}

// export const deleteComment = async (lpId: string | undefined, commentId:number):Promise<ResponseDeleteLpCommentDto> => {
//   const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
//   return data;
// };