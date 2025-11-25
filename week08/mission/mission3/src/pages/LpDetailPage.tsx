// src/pages/LpDetailPage.tsx
import React, { useState, useEffect } from 'react';
// ... (imports는 2-4 단계와 동일) ...
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'; 
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { fetchLpDetail, fetchLpCommentsInfinite } from '../apis/lps';
import type { LpDetail, LpComment } from '../apis/lps';
import CommentSkeleton from '../components/CommentSkeleton';
import { useAuth } from '../context/AuthContext';
import {
  useUpdateLpPost,
  useDeleteLpPost,
  useToggleLikeLp, // ⭐️ (신규) 2-2 좋아요 훅 임포트
} from '../hooks/mutations/useLpMutations';
import { LpPostModal } from '../components/modal/LpPostModal';
import { useCommentMutations } from '../hooks/mutations/useCommentMutations';
import { CommentItem } from '../components/comments/CommentItem'; 

// ... (스타일 코드는 2-4 단계와 동일) ...
const DetailWrapper = styled.div` /* ... */ `;
// ...
const ButtonWrapper = styled.div` /* ... */ `;
const Button = styled.button` /* ... */ `;
// ...
const CommentsWrapper = styled.section` /* ... */ `;
// ... (나머지 스타일 동일) ...

const LpDetailPage: React.FC = () => {
  const { lpid } = useParams<{ lpid: string }>();
  // ... (order, user, isEditModalOpen, newComment state 동일) ...
  const [order, setOrder] = useState<'recent' | 'oldest'>('recent');
  const { user } = useAuth(); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  // --- 1. LP 상세 정보 (useQuery) ---
  const {
    data: lpData,
    isPending: isLoadingLp,
    isError: isErrorLp,
    error: errorLp,
  } = useQuery({ // ⭐️ 6주차 코드 (useQuery 맞음)
    queryKey: ['lp', lpid],
    queryFn: () => fetchLpDetail(lpid!),
    enabled: !!lpid && lpid !== 'new',
  });

  // --- 2. 댓글 목록 (useInfiniteQuery) ---
  const {
    data: commentsData,
    isPending: isLoadingComments,
    // ... (나머지 댓글 훅 관련 코드 동일) ...
  } = useInfiniteQuery({ /* ... */ });
  const { ref: commentsRef, inView: commentsInView } = useInView({ /* ... */ });
  useEffect(() => { /* ... */ }, [/* ... */]);

  // --- 3. Mutation 훅들 ---
  const deleteLp = useDeleteLpPost(lpid!);
  const { createComment, isCreating } = useCommentMutations(lpid!, order);
  
  // ⭐️ (신규) 2-3 좋아요 훅 호출
  const { mutate: toggleLike, isPending: isLiking } = useToggleLikeLp(lpid!);

  // ... (isMyPost, handleDelete, handleCommentSubmit 함수 동일) ...
  const isMyPost = user && lpData && user.id === lpData.userId;
  const handleDelete = () => { /* ... */ };
  const handleCommentSubmit = (e: React.FormEvent) => { /* ... */ };

  // ... (로딩, 에러 처리 동일) ...
  if (isLoadingLp) return <div>LP 정보 로딩 중...</div>;
  if (isErrorLp) return <div>LP 정보 에러: {errorLp.message}</div>;
  if (!lpData) return null; 

  return (
    <>
      {/* --- 1. LP 상세 정보 렌더링 --- */}
      <DetailWrapper>
        <Thumbnail src={lpData.imageUrl} alt={lpData.title} />
        <InfoWrapper>
          <Title>{lpData.title}</Title>
          <MetaInfo>아티스트: {lpData.artist || '정보 없음'}</MetaInfo>
          <MetaInfo>업로드: {new Date(lpData.createdAt).toLocaleDateString()}</MetaInfo>
          
          {/* ⭐️ [수정] MetaInfo에서 likeCount를 lpData에서 직접 읽도록 수정 */}
          <MetaInfo>♥ {lpData.likeCount}</MetaInfo>
          
          <Body>{lpData.content || '본문 내용이 없습니다.'}</Body>

          {/* ⭐️ [수정] 좋아요 버튼 로직 수정 */}
          {isMyPost ? (
            <ButtonWrapper>
              <Button onClick={() => setIsEditModalOpen(true)}>수정</Button>
              <Button onClick={handleDelete} disabled={deleteLp.isPending}>
                {deleteLp.isPending ? '삭제 중...' : '삭제'}
              </Button>
              {/* ⭐️ 좋아요 버튼 */}
              <Button onClick={() => toggleLike()} disabled={isLiking}>
                {lpData.isLiked ? '❤️ 좋아요 취소' : '🤍 좋아요'}
              </Button>
            </ButtonWrapper>
          ) : (
            <ButtonWrapper>
              {/* ⭐️ 좋아요 버튼 */}
              <Button onClick={() => toggleLike()} disabled={isLiking}>
                {lpData.isLiked ? '❤️ 좋아요 취소' : '🤍 좋아요'}
              </Button>
            </ButtonWrapper>
          )}
        </InfoWrapper>
      </DetailWrapper>

      {/* --- 2. 댓글 섹션 (2-4 단계와 동일) --- */}
      <Divider />
      <CommentsWrapper>
        {/* ... (댓글 폼, 정렬 버튼, 댓글 목록 렌더링) ... */}
      </CommentsWrapper>

      {/* --- 3. LP 수정 모달 (1-5 단계와 동일) --- */}
      {isMyPost && (
        <LpPostModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          existingLp={lpData}
        />
      )}
    </>
  );
};

export default LpDetailPage;