import axios from 'axios';

// 1. 데이터 타입 정의
export interface Lp {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  createdAt: string;
  likeCount: number;
}

export interface LpDetail extends Lp {
  content: string;
}

export interface Comment {
  id: number;
  content: string;
  writer: {
    id: number;
    nickname: string;
    profileUrl: string;
  };
  createdAt: string;
}

export interface FetchLpsResponse {
  data: Lp[];
  nextCursor: number | null;
}

interface FetchCommentsResponse {
  data: Comment[];
  nextCursor: number | null;
}

// 2. LP 관련 API
export const fetchLps = async (
  sort: 'recent' | 'oldest',
  cursor: number | null,
  query: string = ''
): Promise<FetchLpsResponse> => {
  const queryParam = query ? `&q=${encodeURIComponent(query)}` : '';
  const response = await axios.get<FetchLpsResponse>(
    `/v1/lps?sort=${sort}&cursor=${cursor ?? ''}${queryParam}`
  );
  return response.data;
};

export const fetchLpDetail = async (lpid: string): Promise<LpDetail> => {
  const response = await axios.get(`/v1/lps/${lpid}`);
  return response.data;
};

export const createLpPost = async (formData: FormData) => {
  const response = await axios.post('/v1/lps', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// ✅ (누락되었던 부분) 수정
export const updateLpPost = async ({ id, formData }: { id: number; formData: FormData }) => {
  const response = await axios.patch(`/v1/lps/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// ✅ (누락되었던 부분) 삭제 - 에러 원인!
export const deleteLpPost = async (id: number) => {
  const response = await axios.delete(`/v1/lps/${id}`);
  return response.data;
};

export const toggleLikeLp = async (lpid: number) => {
  const response = await axios.post(`/v1/lps/${lpid}/likes`);
  return response.data;
};

// 3. 댓글 관련 API
export const fetchLpCommentsInfinite = async (
  lpid: string,
  cursor: number | null
): Promise<FetchCommentsResponse> => {
  const response = await axios.get<FetchCommentsResponse>(
    `/v1/lps/${lpid}/comments?cursor=${cursor ?? ''}`
  );
  return response.data;
};

export const createComment = async ({ postId, content }: { postId: string; content: string }) => {
  const response = await axios.post(`/v1/lps/${postId}/comments`, { content });
  return response.data;
};

export const updateComment = async ({ commentId, content }: { commentId: string; content: string }) => {
  const response = await axios.patch(`/v1/comments/${commentId}`, { content });
  return response.data;
};

export const deleteComment = async (commentId: string) => {
  const response = await axios.delete(`/v1/comments/${commentId}`);
  return response.data;
};