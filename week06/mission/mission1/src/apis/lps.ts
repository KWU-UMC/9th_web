import { api } from './axios'; // 네가 만든 api 인스턴스

// 1. LP 목록 아이템 타입
export interface Lp {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  createdAt: string; 
  likeCount: number;
}

// 2. LP 상세 타입 (본문 등 추가 정보)
export interface LpDetail extends Lp {
  content: string; // (예시. Swagger 문서 참고)
  // ...
}

// (미션) 목록 요청 (GET /v1/lps) - (비로그인도 가능)
export const fetchLps = async (sort: 'recent' | 'oldest'): Promise<Lp[]> => {
  const { data } = await api.get(`/v1/lps?sort=${sort}`);

  console.log('[/v1/lps] API 실제 응답:', data);

  return data.data.data; // (응답 구조에 따라 data.data 또는 data)
};

// (미션) 상세 요청 (GET /lp/:lpid) - (로그인 필요)
export const fetchLpDetail = async (lpid: string): Promise<LpDetail> => {
  // 401 에러가 나면 axios.tsx 인터셉터가 자동으로 토큰 갱신/로그아웃 처리
  const { data } = await api.get(`/v1/lps/${lpid}`);
  return data.data;
};