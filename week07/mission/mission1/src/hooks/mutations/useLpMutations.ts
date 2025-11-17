// src/hooks/mutations/useLpMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createLpPost,
  updateLpPost,
  deleteLpPost,
  type LpCreateData,
  type LpUpdateData,
} from '../../apis/lps'; // ⭐️ 상대 경로 사용
import { useNavigate } from 'react-router-dom';

// 1. LP 생성 훅
export const useCreateLpPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newLp: LpCreateData) => createLpPost(newLp),
    onSuccess: () => {
      // LpListPage의 쿼리 키 ['lps']를 무효화하여 목록을 새로고침
      // (가짜 API라 실제 데이터가 추가되진 않지만, invalidate는 동작함)
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      alert('LP가 생성되었습니다! (Mock)');
    },
    onError: (error) => {
      console.error('LP 생성 실패:', error);
      alert('LP 생성에 실패했습니다.');
    },
  });
};

// 2. LP 수정 훅
export const useUpdateLpPost = (lpid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LpUpdateData) => updateLpPost({ lpid, data }),
    onSuccess: () => {
      // 상세 페이지 쿼리 ['lp', lpid] 무효화
      queryClient.invalidateQueries({ queryKey: ['lp', lpid] });
      // 목록 페이지 쿼리 ['lps'] 무효화
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      alert('LP가 수정되었습니다! (Mock)');
    },
    onError: (error) => {
      console.error('LP 수정 실패:', error);
      alert('LP 수정에 실패했습니다.');
    },
  });
};

// 3. LP 삭제 훅
export const useDeleteLpPost = (lpid: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteLpPost(lpid),
    onSuccess: () => {
      alert('LP가 삭제되었습니다. (Mock)');
      // 목록 페이지 쿼리 ['lps'] 무효화
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      // 삭제 후 메인 페이지로 이동
      navigate('/');
    },
    onError: (error) => {
      console.error('LP 삭제 실패:', error);
      alert('LP 삭제에 실패했습니다.');
    },
  });
};