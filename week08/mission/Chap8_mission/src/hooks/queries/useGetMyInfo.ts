import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants/key';
import { getMyInfo } from '../../apis/auth';

export default function useGetMyInfo(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: [QUERY_KEY.myInfo],
    // 쿼리 함수: 실제로 데이터를 가져오는 비동기 함수
    queryFn: getMyInfo,
    select: (data) => data.data,
    enabled: options?.enabled, // 여기서 제어
  });
}