// src/apis/lps.ts
import { api } from './axios';

// ⭐️ (수정) LP 목록 아이템 타입 - isLiked 추가
export interface Lp {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  createdAt: string; 
  likeCount: number;
  isLiked: boolean; // ⭐️ (신규)
}

// ⭐️ (수정) LP 상세 타입 - isLiked 추가
export interface LpDetail extends Lp {
  content: string; 
  userId: number; 
  // isLiked는 Lp를 extends하며 이미 포함됨
}

// ... (LpApiResponse, LpComment, CommentApiResponse, LpCreateData, LpUpdateData 타입은 동일) ...
export interface LpApiResponse { /* ... */ }
export interface LpComment { /* ... */ }
export interface CommentApiResponse { /* ... */ }
export interface LpCreateData { /* ... */ }
export interface LpUpdateData { /* ... */ }


// ⭐️ --- 2. API 함수들 --- ⭐️

// ⭐️ (수정) createMockLp - isLiked: false 추가
const createMockLp = (id: number): Lp => ({
  id: id,
  title: `Mock LP Title ${id}`,
  artist: `Mock Artist ${id}`,
  imageUrl: `https://picsum.photos/id/${id}/300/300`,
  createdAt: new Date().toISOString(),
  likeCount: id * 10,
  isLiked: false, // ⭐️ (신규)
});

// ... (fetchLpsInfinite 함수는 동일) ...
export const fetchLpsInfinite = async (/* ... */) => { /* ... */ };


// ⭐️ (수정) fetchLpDetail - isLiked: false 추가
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
    userId: 1, 
    content: `이것은 ${id}번 LP의 상세 내용입니다. \n\n가짜(Mock) 데이터입니다.`,
    isLiked: false, // ⭐️ (신규)
  };
};

// ... (fetchLpCommentsInfinite, createMockComment 함수는 동일) ...
export const fetchLpCommentsInfinite = async (/* ... */) => { /* ... */ };

// ... (LP CUD, 댓글 CUD 가짜 API 함수들은 동일) ...
export const createLpPost = async (/* ... */) => { /* ... */ };
export const updateLpPost = async (/* ... */) => { /* ... */ };
export const deleteLpPost = async (/* ... */) => { /* ... */ };
export const createComment = async (/* ... */) => { /* ... */ };
export const updateComment = async (/* ... */) => { /* ... */ };
export const deleteComment = async (/* ... */) => { /* ... */ };


// --- (⭐️ 7주차 2-1단계 신규 추가: 좋아요 가짜 API ⭐️) ---

// (신규) 좋아요 토글 (U) 가짜 API
export const toggleLikeLp = async (lpid: string) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // 0.5초 딜레이
  
  // ⭐️ (중요) 롤백 테스트를 위해 특정 ID(예: 13번)는 고의로 실패시킴
  if (lpid === '13') {
    console.error(`🔥 [Mock API] LP ${lpid} 좋아요 실패! (롤백 테스트)`);
    throw new Error('Mock API Error: Like failed');
  }

  console.log(`❤️ [Mock API] LP ${lpid} 좋아요 토글 성공`);
  return { success: true };
};