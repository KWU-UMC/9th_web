// src/hooks/mutations/useLpMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createLpPost,
  updateLpPost,
  deleteLpPost,
  toggleLikeLp, // ⭐️ (신규) 2-1 좋아요 API 임포트
  type LpCreateData,
  type LpUpdateData,
  type LpDetail, // ⭐️ (신규) LpDetail 타입 임포트
} from '../../apis/lps';
import { useNavigate } from 'react-router-dom';

// ... (useCreateLpPost, useUpdateLpPost, useDeleteLpPost 훅은 1-2 단계와 동일) ...
export const useCreateLpPost = () => { /* ... */ };
export const useUpdateLpPost = (lpid: string) => { /* ... */ };
export const useDeleteLpPost = (lpid: string) => { /* ... */ };


// --- (⭐️ 7주차 2-2단계 신규 추가: 좋아요 훅 ⭐️) ---

export const useToggleLikeLp = (lpid: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['lp', lpid]; // LpDetailPage의 상세 정보 쿼리 키

  return useMutation({
    mutationFn: () => toggleLikeLp(lpid),

    // 1. onMutate: 좋아요 상태와 카운트 즉시 변경
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousLp = queryClient.getQueryData<LpDetail>(queryKey);

      if (!previousLp) return; // 캐시가 없으면 중단

      // 1-1. [핵심] UI 즉시 업데이트
      queryClient.setQueryData<LpDetail>(queryKey, (oldLp) => {
        if (!oldLp) return;
        
        const isLiked = !oldLp.isLiked; // 상태 반전
        const likeCount = isLiked ? oldLp.likeCount + 1 : oldLp.likeCount - 1; // 카운트 증감
        
        return { ...oldLp, isLiked, likeCount };
      });

      // 1-2. 롤백용 데이터 반환
      return { previousLp };
    },

    // 2. onError: 실패 시 롤백 (lpid 13번 테스트)
    onError: (err, variables, context) => {
      if (context?.previousLp) {
        queryClient.setQueryData(queryKey, context.previousLp);
      }
      alert('좋아요 처리에 실패했습니다. (롤백)');
    },

    // 3. onSettled: 항상 서버 데이터와 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      // (목록 페이지의 좋아요 수도 동기화가 필요하다면)
      // queryClient.invalidateQueries({ queryKey: ['lps'] });
    },
  });
};