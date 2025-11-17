import { useMutation } from "@tanstack/react-query"
import { patchUser } from "../../apis/auth"
import { queryClient } from "../../App"
import { QUERY_KEY } from "../../constants/key"
import { useAuth } from "../../context/AuthContext"
import type { ResponseMyInfoDto } from "../../types/auth"

type PatchUserContext = {
  previousUser?: ResponseMyInfoDto["data"];
};

export const usePatchUsers = () => {
  const { setName } = useAuth();

  return useMutation({
    mutationFn: patchUser,
    onMutate: async (body) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });
      const previousUser = queryClient.getQueryData<ResponseMyInfoDto["data"]>([QUERY_KEY.myInfo]);

      if (previousUser) {
        const nextUser = {
          ...previousUser,
          name: body.name ?? previousUser.name,
          bio: body.bio ?? previousUser.bio,
          avatar: body.avatar ?? previousUser.avatar,
        };

        queryClient.setQueryData([QUERY_KEY.myInfo], nextUser);
        setName(nextUser.name);
      }

      return { previousUser };
    },
    onError: (_error, _variables, context: PatchUserContext | undefined) => {
      if (context?.previousUser) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.previousUser);
        setName(context.previousUser.name);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
    },
  });
}
