// src/hooks/mutations/useUserMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMyInfo, type UserUpdateData } from '../../apis/auth';
import { useAuth } from '../../context/AuthContext'; 

// ⭐️ [수정] useUpdateMyInfo 훅 전체
export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();
  // ⭐️ 1-1에서 추가한 setOptimisticUser와 현재 유저(롤백용)를 가져옴
  const { user, refetchUser, setOptimisticUser } = useAuth(); 

  return useMutation({
    mutationFn: (data: UserUpdateData) => updateMyInfo(data),
    
    // ⭐️ (신규) 1. onMutate: 서버 요청 직전에 UI 즉시 변경
    onMutate: async (newData) => {
      // 1-1. MyPage 쿼리(useQuery) 즉시 중단 (서버 데이터가 덮어쓰는 것 방지)
      const queryKey = ['myInfo'];
      await queryClient.cancelQueries({ queryKey });

      // 1-2. 롤백을 위한 이전 데이터 스냅샷
      const previousMyInfo = queryClient.getQueryData(queryKey);
      const previousUser = user; // AuthContext의 이전 유저 정보

      // 1-3. [핵심] MyPage 캐시(useQuery)를 새 데이터로 즉시 업데이트
      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return;
        return { ...oldData, ...newData }; // { name, bio } 덮어쓰기
      });
      
      // 1-4. [핵심] Header 캐시(AuthContext)를 새 데이터로 즉시 업데이트
      setOptimisticUser(newData);

      // 1-5. 롤백용 데이터(context) 반환
      return { previousMyInfo, previousUser };
    },

    // ⭐️ (신규) 2. onError: 뮤테이션 실패 시 onMutate에서 반환한 context로 롤백
    onError: (err, newData, context) => {
      // 2-1. MyPage 캐시 롤백
      if (context?.previousMyInfo) {
        queryClient.setQueryData(['myInfo'], context.previousMyInfo);
      }
      // 2-2. Header(AuthContext) 롤백
      if (context?.previousUser) {
        setOptimisticUser(context.previousUser);
      }
      alert('프로필 수정에 실패했습니다. (롤백)');
    },

    // ⭐️ (신규) 3. onSettled: 성공/실패 여부와 관계없이 항상 실행 (동기화)
    onSettled: () => {
      // 3-1. MyPage 쿼리를 서버 최신 데이터로 동기화
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
      // 3-2. Header(AuthContext)를 서버 최신 데이터로 동기화
      refetchUser(); 
    },
    
    // ⭐️ (수정) onSuccess는 onSettled가 처리하므로 비워두거나 간단한 알림만
    onSuccess: () => {
      // alert('프로필이 수정되었습니다. (Mock)'); // onSettled가 처리
    }
  });
};