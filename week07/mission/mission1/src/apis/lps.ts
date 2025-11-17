// src/apis/lps.ts
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

// ⭐️ (수정) LP 상세 타입 - userId 추가 (1-1단계)
export interface LpDetail extends Lp {
  content: string; 
  userId: number; // 글 작성자 ID (가짜 데이터)
}

// LP 목록 API (무한 스크롤) 응답 타입
export interface LpApiResponse {
  data: Lp[]; 
  nextCursor: number | null;
  hasNext: boolean;
}

// ⭐️ (수정) 댓글 타입 - userId 추가 (2-1단계)
export interface LpComment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  userId: number; // ⭐️ (신규) 댓글 작성자 ID (가짜 데이터)
}

// 댓글 API (무한 스크롤) 응답 타입
export interface CommentApiResponse {
  data: LpComment[];
  nextCursor: number | null;
  hasNext: boolean;
}

// (신규) LP 생성시 FormData에 담을 데이터 타입 (가짜) (1-1단계)
export interface LpCreateData {
  title: string;
  artist: string;
  content: string;
  image: File;
  tags: string[];
}

// (신규) LP 수정시 전송할 데이터 타입 (가짜) (1-1단계)
export interface LpUpdateData {
  title?: string;
  artist?: string;
  content?: string;
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

// ⭐️ [오류 수정] 'export' 추가 (6주차)
export const fetchLpsInfinite = async ({
  pageParam = 1,
}: {
  pageParam?: number | null;
}): Promise<LpApiResponse> => {
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  const pageSize = 20; 
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


// --- (가짜 LP 상세 함수: LpDetailPage용) (1-1단계 수정) ---

export const fetchLpDetail = async (lpid: string): Promise<LpDetail> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const id = parseInt(lpid, 10); 
  return {
    id: id,
    title: `Mock LP Title ${id}`,
    artist: `Mock Artist ${id}`,
    imageUrl: `https://picsum.photos/id/${id}/300/300`,
    createdAt: new Date().toISOString(),
    likeCount: id * 10,
    content: `이것은 ${id}번 LP의 상세 내용입니다. \n\n가짜(Mock) 데이터입니다.`,
    userId: 1, // 1번 유저(나)가 쓴 것으로 가정
  };
};


// --- (가짜 댓글 목록 함수: LpDetailPage용) ---

// ⭐️ (수정) createMockComment - userId 추가 (2-1단계)
const createMockComment = (id: number, order: string): LpComment => ({
  id: id,
  author: `Mock User ${id}`,
  content: `Mock 댓글 ${id} (정렬: ${order})`,
  createdAt: new Date(Date.now() - id * 100000).toISOString(),
  userId: id % 3 === 0 ? 1 : id + 10, // 3의 배수 댓글은 1번 유저(나)가 씀
});

// ⭐️ [오류 수정] 'export' 추가 (6주차)
export const fetchLpCommentsInfinite = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: (string | number)[]; 
  pageParam?: number | null;
}): Promise<CommentApiResponse> => {
  const [_key, lpid, order] = queryKey;
  await new Promise(resolve => setTimeout(resolve, 1000));
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

// --- (7주차 1단계: LP CUD 가짜 API) ---
export const createLpPost = async (newLp: LpCreateData) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log('📬 [Mock API] LP 생성 요청:', newLp);
  return { success: true, message: 'LP가 성공적으로 생성되었습니다.', data: { id: 999, title: newLp.title } };
};
export const updateLpPost = async ({ lpid, data }: { lpid: string; data: LpUpdateData; }) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`✏️ [Mock API] LP ${lpid} 수정 요청:`, data);
  return { success: true, message: 'LP가 수정되었습니다.' };
};
export const deleteLpPost = async (lpid: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`🔥 [Mock API] LP ${lpid} 삭제 요청:`);
  return { success: true, message: 'LP가 삭제되었습니다.' };
};

// --- (7주차 2단계: 댓글 CUD 가짜 API) ---
export const createComment = async ({ lpid, content }: { lpid: string; content: string }) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`📬 [Mock API] LP ${lpid}에 댓글 생성:`, content);
  return { success: true, message: '댓글이 생성되었습니다.' };
};
export const updateComment = async ({ commentId, content }: { commentId: number; content: string }) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`✏️ [Mock API] 댓글 ${commentId} 수정:`, content);
  return { success: true, message: '댓글이 수정되었습니다.' };
};
export const deleteComment = async (commentId: number) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`🔥 [Mock API] 댓글 ${commentId} 삭제`);
  return { success: true, message: '댓글이 삭제되었습니다.' };
};