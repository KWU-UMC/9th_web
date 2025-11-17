// src/pages/LpDetailPage.tsx
import React, { useState, useEffect } from 'react';
// ⭐️ [오류 수정] useQuery와 useInfiniteQuery를 둘 다 import합니다.
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'; 
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer'; 
import styled from 'styled-components';

// ⭐️ 1-1, 2-1 단계에서 'export'가 추가된 함수들 import
import { fetchLpDetail, fetchLpCommentsInfinite } from '../apis/lps';
import type { LpDetail, LpComment } from '../apis/lps';

import CommentSkeleton from '../components/CommentSkeleton';
import { useAuth } from '../context/AuthContext';
import {
  useUpdateLpPost,
  useDeleteLpPost,
} from '../hooks/mutations/useLpMutations';
import { LpPostModal } from '../components/modal/LpPostModal';
import { useCommentMutations } from '../hooks/mutations/useCommentMutations';
import { CommentItem } from '../components/comments/CommentItem'; 

// ... (스타일 코드는 2-4 단계와 동일) ...
const DetailWrapper = styled.div` /* ... */ `;
const Thumbnail = styled.img` /* ... */ `;
const InfoWrapper = styled.div` /* ... */ `;
const Title = styled.h1` /* ... */ `;
const MetaInfo = styled.p` /* ... */ `;
const Body = styled.div` /* ... */ `;
const ButtonWrapper = styled.div` /* ... */ `;
const Button = styled.button` /* ... */ `;
const Divider = styled.hr` /* ... */ `;
const CommentsWrapper = styled.section` /* ... */ `;
const CommentFormWrapper = styled.form` /* ... */ `;
const CommentTextarea = styled.textarea` /* ... */ `;
const CommentButton = styled.button` /* ... */ `;
const SortButtonWrapper = styled.div` /* ... */ `;
const SortButton = styled.button<{ $active: boolean }>` /* ... */ `;
const CommentList = styled.div` /* ... */ `;
// --- (스타일 코드 끝) ---

const LpDetailPage: React.FC = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const [order, setOrder] = useState<'recent' | 'oldest'>('recent');
  const { user } = useAuth(); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  // --- 1. LP 상세 정보 (useQuery) ---
  
  // ⭐️ [오류 수정] 여기가 useInfiniteQuery가 아닌 'useQuery'가 되어야 합니다.
  const {
    data: lpData,
    isPending: isLoadingLp,
    isError: isErrorLp,
    error: errorLp,
  } = useQuery({ 
    queryKey: ['lp', lpid],
    queryFn: () => fetchLpDetail(lpid!),
    enabled: !!lpid && lpid !== 'new',
    // (getNextPageParam이 필요 없습니다)
  });

  // --- 2. 댓글 목록 (useInfiniteQuery) ---
  const {
    data: commentsData,
    isPending: isLoadingComments,
    isError: isErrorComments,
    error: errorComments,
    fetchNextPage: fetchNextComments,
    hasNextPage: hasNextComments,
    isFetchingNextPage: isFetchingNextComments,
  } = useInfiniteQuery({
    queryKey: ['lpComments', lpid, order],
    queryFn: fetchLpCommentsInfinite,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => { // ⭐️ 댓글은 이 함수가 필수입니다.
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    enabled: !!lpid && lpid !== 'new',
  });

  // ... (댓글용 useInView, useEffect 동일) ...
  const { ref: commentsRef, inView: commentsInView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (commentsInView && hasNextComments && !isFetchingNextComments) {
      fetchNextComments();
    }
  }, [commentsInView, hasNextComments, isFetchingNextComments, fetchNextComments]);

  // ... (LP CUD 훅, isMyPost, handleDelete 동일) ...
  const deleteLp = useDeleteLpPost(lpid!);
  const isMyPost = user && lpData && user.id === lpData.userId;
  const handleDelete = () => { 
    if (window.confirm('정말 이 LP를 삭제하시겠습니까? (Mock)')) {
      deleteLp.mutate();
    }
  };

  // ⭐️ (댓글 CUD 훅, 2-4 단계)
  const { createComment, isCreating } = useCommentMutations(lpid!, order);

  // ⭐️ (댓글 제출 핸들러, 2-4 단계)
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    createComment(newComment, {
      onSuccess: () => setNewComment(''),
    });
  };

  // --- 3. 로딩 및 에러 처리 ---
  if (isLoadingLp) return <div>LP 정보 로딩 중...</div>;
  if (isErrorLp) return <div>LP 정보 에러: {errorLp.message}</div>;
  if (!lpData) return null; // ⭐️ useQuery가 enabled: false일 때 lpData는 undefined

  return (
    <>
      {/* --- 1. LP 상세 정보 렌더링 --- */}
      <DetailWrapper>
        {/* ⭐️ 이제 lpData가 LpDetail 타입이므로 오류가 사라집니다. */}
        <Thumbnail src={lpData.imageUrl} alt={lpData.title} />
        <InfoWrapper>
          <Title>{lpData.title}</Title>
          <MetaInfo>아티스트: {lpData.artist || '정보 없음'}</MetaInfo>
          <MetaInfo>업로드: {new Date(lpData.createdAt).toLocaleDateString()}</MetaInfo>
          <MetaInfo>♥ {lpData.likeCount}</MetaInfo>
          <Body>{lpData.content || '본문 내용이 없습니다.'}</Body>
          {isMyPost ? (
            <ButtonWrapper>
              <Button onClick={() => setIsEditModalOpen(true)}>수정</Button>
              <Button onClick={handleDelete} disabled={deleteLp.isPending}>
                {deleteLp.isPending ? '삭제 중...' : '삭제'}
              </Button>
              <Button>좋아요</Button>
            </ButtonWrapper>
          ) : (
            <ButtonWrapper>
              <Button>좋아요</Button>
            </ButtonWrapper>
          )}
        </InfoWrapper>
      </DetailWrapper>

      {/* --- 2. 댓글 섹션 --- */}
      <Divider />
      <CommentsWrapper>
        <h2>댓글</h2>
        
        {/* ⭐️ (댓글 작성란 UI, 2-4 단계) */}
        <CommentFormWrapper onSubmit={handleCommentSubmit}>
          <CommentTextarea 
            placeholder="댓글을 입력하세요..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isCreating}
          />
          <CommentButton type="submit" disabled={isCreating}>
            {isCreating ? '등록 중...' : '등록'}
          </CommentButton>
        </CommentFormWrapper>

        {/* ⭐️ (댓글 정렬 버튼, 6주차) */}
        <SortButtonWrapper>
          <SortButton $active={order === 'recent'} onClick={() => setOrder('recent')}>
            최신순
          </SortButton>
          <SortButton $active={order === 'oldest'} onClick={() => setOrder('oldest')}>
            오래된순
          </SortButton>
        </SortButtonWrapper>

        {/* --- 3. 댓글 목록 렌더링 (2-4 단계) --- */}
        <CommentList>
          {isLoadingComments ? (
            Array.from({ length: 3 }).map((_, index) => (
              <CommentSkeleton key={index} />
            ))
          ) : isErrorComments ? (
            <div>댓글 로딩 실패: {errorComments.message}</div>
          ) : (
            commentsData?.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.data.map((comment: LpComment) => (
                  <CommentItem 
                    key={comment.id} 
                    comment={comment} 
                    lpid={lpid!} 
                    order={order}
                  />
                ))}
              </React.Fragment>
            ))
          )}
          {isFetchingNextPage &&
            Array.from({ length: 2 }).map((_, index) => (
              <CommentSkeleton key={`loading-${index}`} />
            ))}
        </CommentList>
        {hasNextComments && <div ref={commentsRef} style={{ height: '50px' }} />}
      </CommentsWrapper>

      {/* ... (LP 수정 모달 동일, 1-5 단계) ... */}
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