import { useMutation } from "@tanstack/react-query"
import { postLike } from "../../apis/lp"
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { Likes, RequestLpDto, ResponseLpDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";

export const usePostLike = () => {
  return useMutation({
    mutationFn: postLike,
    // data -> API 성공 응답데이터
    // variables -> mutate에 전달한 값
    // context -> onMutate에서 반환한 값
    // onSuccess: (data) => { // 성공하고 리스폰스 값이 data에 담겨서
    //   queryClient.invalidateQueries({
    //     queryKey: [QUERY_KEY.lps, data.data.lpId],
    //     exact: true,
    //   });
    // },
    // onError: (error, variables, context) => {}, -> 실패시 실행되는 함수
    // error -> 요청 실패시 발생한 에러
    // variables -> mutate에 전달한 값
    // context -> onMutate에서 반환한 값
    // onMutate: (variables) => {}, -> 요청 직전에 실행되는 함수
    // Optimistic Update를 구현할 때 유용
    // onSettled: (data, error, variables, context) => {}, -> 요청이 끝난 후 항상 실행되는 함수
    // 로딩 상태를 초기화할 때 조금 유용하다
    onMutate: async(lp: RequestLpDto) => {
      // 1. 이 게시글에 관련된 쿼리를 취소(캐시된 데이터를 새로 불러오는 요청)
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });

      // 2. 현재 게시글의 데이터를 캐시에서 가져오기
      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([QUERY_KEY.lps, lp.lpId]);
      
      // 게시글 데이터를 복사해서 NewLpPost라는 새로운 객체 만들기
      // 복사하는 가장 큰 이유는 나중에 오류가 발생했을 때 이전 상태로 되돌리기 위해서
      const newLpPost = {
        ...previousLpPost,
        data: {
          ...previousLpPost?.data,
          likes: previousLpPost?.data.likes ? previousLpPost.data.likes.map(l => ({...l})) : []
        }
      }
    
      // 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치를 찾아야합니다.
      const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
      const userId = Number(me?.data.id);
    
      const likedIndex = previousLpPost?.data.likes.findIndex((like) => like.userId === userId) ?? -1;
    
      if (likedIndex >= 0){
        newLpPost.data.likes = newLpPost.data.likes.filter(l => l.userId !== userId);
      } else {
        const newLike = {userId, lpId: lp.lpId} as Likes;
        newLpPost.data.likes = [...newLpPost.data.likes, newLike];
      }
    
      // 업데이트된 게시글 데이터를 캐시에 저장
      // 이렇게하면 UI가 바로 업데이트 됨. 사용자가 변화 확인 가능
      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);
    
      return {previousLpPost, newLpPost};
    },
    onError: (err, newLp, context) => {
      console.log(err, newLp);
      queryClient.setQueryData([QUERY_KEY.lps, newLp.lpId], context?.previousLpPost?.data.id);
    },
    // onSettled는 API 요청이 끝난후 성공하든 실패하든 실행
    onSettled: async(_data, _error, variables) => {
      await queryClient.invalidateQueries({
        queryKey:[QUERY_KEY.lps, variables.lpId],
      });
    },
  });
}