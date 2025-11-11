import { api } from './axios';

// ⭐️ --- 1. 타입 정의 (모든 타입) --- ⭐️

// LP 목록 아이템 타입
export interface Lp {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  createdAt: string; 
  likeCount: number;
}

// LP 상세 타입
export interface LpDetail extends Lp {
  content: string; 
}

// LP 목록 API (무한 스크롤) 응답 타입
export interface LpApiResponse {
  data: Lp[]; 
  nextCursor: number | null;
  hasNext: boolean;
}

// 댓글 타입
export interface LpComment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

// 댓글 API (무한 스크롤) 응답 타입
export interface CommentApiResponse {
  data: LpComment[];
  nextCursor: number | null;
  hasNext: boolean;
}


// ⭐️ --- 2. API 함수들 --- ⭐️

// --- (가짜 LP 목록 함수: LpListPage용) ---

const createMockLp = (id: number): Lp => ({
  id: id,
  title: `Mock LP Title ${id}`,
  artist: `Mock Artist ${id}`,
  imageUrl: `https://picsum.photos/id/${id}/300/300`,
  createdAt: new Date().toISOString(),
  likeCount: id * 10,
});

export const fetchLpsInfinite = async ({
  pageParam = 1,
}: {
  pageParam?: number | null;
}): Promise<LpApiResponse> => {
  
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 딜레이
  const pageSize = 20; // 20개씩
  const data: Lp[] = [];

  if (pageParam === 1) {
    for (let i = 1; i <= pageSize; i++) data.push(createMockLp(i));
    return { data, nextCursor: 2, hasNext: true };
  }
  if (pageParam === 2) {
    for (let i = pageSize + 1; i <= pageSize * 2; i++) data.push(createMockLp(i));
    return { data, nextCursor: 3, hasNext: true };
  }
  if (pageParam === 3) {
    for (let i = (pageSize * 2) + 1; i <= (pageSize * 2) + 4; i++) data.push(createMockLp(i));
    return { data, nextCursor: null, hasNext: false };
  }
  return { data: [], nextCursor: null, hasNext: false };
};


// --- (⭐️ 수정 ⭐️ 가짜 LP 상세 함수: LpDetailPage용) ---

export const fetchLpDetail = async (lpid: string): Promise<LpDetail> => {
  
  // 1초 딜레이 (로딩 테스트)
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const id = parseInt(lpid, 10); // lpid "1" -> 숫자 1

  // ⭐️ 가짜 상세 데이터 반환
  return {
    id: id,
    title: `Mock LP Title ${id}`,
    artist: `Mock Artist ${id}`,
    imageUrl: `https://picsum.photos/id/${id}/300/300`,
    createdAt: new Date().toISOString(),
    likeCount: id * 10,
    content: `이것은 ${id}번 LP의 상세 내용입니다. \n\n가짜(Mock) 데이터로 렌더링되었습니다. \n\n이제 아래의 댓글 기능을 테스트할 수 있습니다.`
  };
};


// --- (가짜 댓글 목록 함수: LpDetailPage용) ---

const createMockComment = (id: number, order: string): LpComment => ({
  id: id,
  author: `Mock User ${id}`,
  content: `Mock 댓글 ${id} (정렬: ${order})`,
  createdAt: new Date(Date.now() - id * 100000).toISOString(),
});

export const fetchLpCommentsInfinite = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: (string | number)[]; 
  pageParam?: number | null;
}): Promise<CommentApiResponse> => {
  const [_key, lpid, order] = queryKey;
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 딜레이
  const pageSize = 5;
  const data: LpComment[] = [];

  if (pageParam === 1) {
    for (let i = 1; i <= pageSize; i++) data.push(createMockComment(i, order as string));
    return { data, nextCursor: 2, hasNext: true };
  }
  if (pageParam === 2) {
    for (let i = pageSize + 1; i <= pageSize * 2; i++) data.push(createMockComment(i, order as string));
    return { data, nextCursor: 3, hasNext: true };
  }
  return { data: [], nextCursor: null, hasNext: false };
};