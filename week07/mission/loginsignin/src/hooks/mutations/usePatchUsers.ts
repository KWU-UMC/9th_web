import { useMutation } from "@tanstack/react-query"
import { patchUser } from "../../apis/auth"
import { queryClient } from "../../App"
import { QUERY_KEY } from "../../constants/key"
import type { RequestPatchUser, ResponsePatchUser } from "../../types/auth"

export const usePatchUsers = (setIsEdit: React.Dispatch<React.SetStateAction<boolean>>) => {
  return useMutation({
    mutationFn: patchUser,
    onMutate: async(inputInfo:RequestPatchUser) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.myInfo],
      });

      const previousMyInfo = queryClient.getQueryData<ResponsePatchUser>([QUERY_KEY.myInfo]);

      const newMyInfoData = {
        id: previousMyInfo?.data.id,
        name: inputInfo.name,
        email: previousMyInfo?.data.email,
        bio: inputInfo.bio,
        avatar: inputInfo.avatar,
        createdAt: previousMyInfo?.data.createdAt,
        updatedAt: previousMyInfo?.data.updatedAt,
      };

      const newMyInfo = {...previousMyInfo, data: newMyInfoData};

      queryClient.setQueryData([QUERY_KEY.myInfo], newMyInfo);
      setIsEdit(false);

      return {previousMyInfo, newMyInfo};
    },
    onError: (err, newLp, context) => {
      console.log(err, newLp);
      queryClient.setQueryData([QUERY_KEY.myInfo], context?.previousMyInfo);
    },
    // onSettled는 API 요청이 끝난후 성공하든 실패하든 실행
    onSettled: async() => {
      await queryClient.invalidateQueries({
        queryKey:[QUERY_KEY.myInfo],
        exact: true,
      });
    },
  });
}