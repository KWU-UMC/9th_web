import React, { useState, useEffect } from 'react'; // ⭐️ useState, useEffect 추가
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'; // ⭐️ useInfiniteQuery 추가
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer'; // ⭐️ 댓글용 InView
import styled from 'styled-components';

// ⭐️ 1단계에서 만든 새 함수와 타입 import
import { fetchLpDetail, fetchLpCommentsInfinite } from '../apis/lps';
import type { LpDetail, LpComment } from '../apis/lps';

// ⭐️ 2단계에서 만든 스켈레톤 import
import CommentSkeleton from '../components/CommentSkeleton';

// (기존 스타일: DetailWrapper, Thumbnail, InfoWrapper, Title, MetaInfo, Body, ButtonWrapper, Button)
const DetailWrapper = styled.div`
  display: flex;
  gap: 2rem;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Thumbnail = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 8px;
  object-fit: cover;
  background-color: #282828;
`;
const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  margin: 0 0 0.5rem;
`;
const MetaInfo = styled.p`
  color: #b3b3b3;
  margin: 0.25rem 0;
`;
const Body = styled.div`
  margin-top: 2rem;
  line-height: 1.6;
  white-space: pre-wrap;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
`;
const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: #282828;
  color: white;
  font-weight: bold;
  &:hover { background-color: #383838; }
`;

// ⭐️ --- (여기부터 댓글 스타일) --- ⭐️

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #282828;
  margin: 3rem 0;
`;

const CommentsWrapper = styled.section`
  margin-top: 3rem;
  color: white;
`;

// ⭐️ (미션) 댓글 작성란 UI
const CommentFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const CommentTextarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #555;
  border-radius: 4px;
  background-color: #282828;
  color: white;
  font-size: 1rem;
  min-height: 100px;
  font-family: inherit;
  resize: vertical;
`;

const CommentButton = styled.button`
  align-self: flex-end;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 20px;
  background-color: #f0f;
  color: black;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  &:disabled { background-color: #555; cursor: not-allowed; }
`;

const SortButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

// ⭐️ (미션) LpListPage의 SortButton과 동일 (Transient prop $active 사용)
const SortButton = styled.button<{ $active: boolean }>`
  background-color: ${({ $active }) => ($active ? '#555' : 'transparent')};
  color: white;
  border: 1px solid #555;
  border-radius: 15px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  cursor: pointer;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1rem 0;
  border-bottom: 1px solid #282828;
`;

const CommentAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #555;
  flex-shrink: 0;
  // TODO: 아바타 이미지
`;

const CommentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
  font-size: 0.9rem;
`;
const CommentBody = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
`;
const CommentDate = styled.span`
  font-size: 0.75rem;
  color: #b3b3b3;
`;


const LpDetailPage: React.FC = () => {
  const { lpid } = useParams<{ lpid: string }>();

  // ⭐️ (미션) 댓글 정렬 상태
  const [order, setOrder] = useState<'recent' | 'oldest'>('recent');

  // --- 1. LP 상세 정보 (useQuery) ---
  const {
    data: lpData,
    isPending: isLoadingLp,
    isError: isErrorLp,
    error: errorLp,
  } = useQuery({
    queryKey: ['lp', lpid],
    queryFn: () => fetchLpDetail(lpid!),
    enabled: !!lpid && lpid !== 'new',
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
    // ⭐️ (미션) queryKey에 lpid와 order 포함
    queryKey: ['lpComments', lpid, order],
    queryFn: fetchLpCommentsInfinite,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    enabled: !!lpid && lpid !== 'new',
  });

  // ⭐️ (미션) 댓글용 Intersection Observer
  const { ref: commentsRef, inView: commentsInView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (commentsInView && hasNextComments && !isFetchingNextComments) {
      fetchNextComments();
    }
  }, [commentsInView, hasNextComments, isFetchingNextComments, fetchNextComments]);


  // --- 3. 로딩 및 에러 처리 ---
  if (isLoadingLp) return <div>LP 정보 로딩 중...</div>;
  if (isErrorLp) return <div>LP 정보 에러: {errorLp.message}</div>;
  if (!lpData) return null; // enabled: false인 경우

  return (
    <>
      {/* --- 1. LP 상세 정보 렌더링 --- */}
      <DetailWrapper>
        <Thumbnail src={lpData.imageUrl} alt={lpData.title} />
        <InfoWrapper>
          <Title>{lpData.title}</Title>
          <MetaInfo>아티스트: {lpData.artist || '정보 없음'}</MetaInfo>
          <MetaInfo>업로드: {new Date(lpData.createdAt).toLocaleDateString()}</MetaInfo>
          <MetaInfo>♥ {lpData.likeCount}</MetaInfo>
          <Body>{lpData.content || '본문 내용이 없습니다.'}</Body>
          <ButtonWrapper>
            <Button>수정</Button>
            <Button>삭제</Button>
            <Button>좋아요</Button>
          </ButtonWrapper>
        </InfoWrapper>
      </DetailWrapper>

      {/* --- 2. 댓글 섹션 --- */}
      <Divider />
      <CommentsWrapper>
        <h2>댓글</h2>

        {/* ⭐️ (미션) 댓글 작성란 UI */}
        <CommentFormWrapper onSubmit={(e) => e.preventDefault()}>
          <CommentTextarea placeholder="댓글을 입력하세요..." />
          <CommentButton type="submit">등록</CommentButton>
        </CommentFormWrapper>

        {/* ⭐️ (미션) 댓글 정렬 버튼 */}
        <SortButtonWrapper>
          <SortButton
            $active={order === 'recent'}
            onClick={() => setOrder('recent')}
          >
            최신순
          </SortButton>
          <SortButton
            $active={order === 'oldest'}
            onClick={() => setOrder('oldest')}
          >
            오래된순
          </SortButton>
        </SortButtonWrapper>

        {/* --- 3. 댓글 목록 렌더링 --- */}
        <CommentList>
          {/* ⭐️ (미션) 초기 로딩 시 스켈레톤 (상단) */}
          {isLoadingComments ? (
            Array.from({ length: 3 }).map((_, index) => (
              <CommentSkeleton key={index} />
            ))
          ) : isErrorComments ? (
            <div>댓글 로딩 실패: {errorComments.message}</div>
          ) : (
            // ⭐️ (미션) 댓글 데이터 렌더링
            commentsData?.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.data.map((comment: LpComment) => (
                  <CommentItem key={comment.id}>
                    <CommentAvatar />
                    <CommentContent>
                      <CommentAuthor>{comment.author}</CommentAuthor>
                      <CommentBody>{comment.content}</CommentBody>
                      <CommentDate>{new Date(comment.createdAt).toLocaleString()}</CommentDate>
                    </CommentContent>
                  </CommentItem>
                ))}
              </React.Fragment>
            ))
          )}

          {/* ⭐️ (미션) 추가 로딩 시 스켈레톤 (하단) */}
          {isFetchingNextComments &&
            Array.from({ length: 2 }).map((_, index) => (
              <CommentSkeleton key={`loading-${index}`} />
            ))}
        </CommentList>

        {/* ⭐️ (미션) 댓글 무한스크롤 트리거 */}
        {hasNextComments && <div ref={commentsRef} style={{ height: '50px' }} />}

      </CommentsWrapper>
    </>
  );
};

export default LpDetailPage;