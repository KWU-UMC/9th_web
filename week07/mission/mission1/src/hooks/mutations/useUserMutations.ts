// src/hooks/mutations/useUserMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMyInfo, type UserUpdateData } from '../../apis/auth'; // ⭐️ 상대 경로
import { useAuth } from '../../context/AuthContext'; // ⭐️ 상대 경로

export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();
  const { refetchUser } = useAuth(); // 3-2에서 AuthContext에 추가한 함수

  return useMutation({
    mutationFn: (data: UserUpdateData) => updateMyInfo(data),
    onSuccess: () => {
      // 1. MyPage의 쿼리 ['myInfo'] 무효화 (MyPage.tsx에서 사용 예정)
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
      
      // 2. AuthContext의 유저 정보(user)도 새로고침
      // (Header 등 다른 컴포넌트의 유저 이름을 바로 업데이트하기 위함)
      refetchUser();
      
      alert('프로필이 수정되었습니다. (Mock)');
    },
    onError: (error) => {
      console.error('프로필 수정 실패:', error);
      alert('프로필 수정에 실패했습니다.');
    },
  });
};