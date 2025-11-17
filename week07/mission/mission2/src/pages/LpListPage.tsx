// src/pages/LpListPage.tsx
import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query'; 
import { useInView } from 'react-intersection-observer'; 
import styled from 'styled-components';
import { fetchLpsInfinite } from '../apis/lps'; 
import LpCard from '../components/LpCard';
import LpCardSkeleton from '../components/LpCardSkeleton'; 
import type { Lp } from '../apis/lps';
import { LpPostModal } from '../components/modal/LpPostModal'; // ⭐️ 모달 임포트

// ... (SortButton, GridContainer 스타일은 동일) ...
const SortButton = styled.button<{ $active: boolean }>` /* ... */ `;
const GridContainer = styled.div` /* ... */ `;


// ⭐️ (신규) FloatingButton 스타일 추가 (Link가 아닌 button)
const FloatingButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f0f;
  color: black;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  border: none;
  cursor: pointer;
  z-index: 100; // ⭐️
`;

const LpListPage: React.FC = () => {
  const [sort, setSort] = useState<'recent' | 'oldest'>('recent');
  // ⭐️ (신규) 모달 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ... (useInfiniteQuery, useInView, useEffect, 에러 처리는 동일) ...
  const {
    data,
    isPending: isLoading, 
    isError,
    error,
    refetch,
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
  } = useInfiniteQuery({
    queryKey: ['lps', sort],
    queryFn: fetchLpsInfinite, 
    initialPageParam: 1, 
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    staleTime: 30_000,
    gcTime: 5 * 60 * 1000,
  });

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) return ( <div>...</div> );
  // ... (이하 렌더링 코드) ...

  return (
    <div>
      {/* ... (정렬 버튼 UI 동일) ... */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <SortButton $active={sort === 'oldest'} onClick={() => setSort('oldest')}>
          오래된순
        </SortButton>
        <SortButton $active={sort === 'recent'} onClick={() => setSort('recent')}>
          최신순
        </SortButton>
      </div>

      <GridContainer>
        {/* ... (isLoading, data?.pages.map, isFetchingNextPage 스켈레톤 렌더링 동일) ... */}
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <LpCardSkeleton key={index} />
          ))
        ) : (
          data?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.data.map((lp: Lp) => (
                <LpCard key={lp.id} lp={lp} />
              ))}
            </React.Fragment>
          ))
        )}
        {isFetchingNextPage &&
          Array.from({ length: 4 }).map((_, index) => (
            <LpCardSkeleton key={`loading-${index}`} />
          ))}
      </GridContainer>

      {/* ... (무한스크롤 트리거 요소 동일) ... */}
      {hasNextPage && <div ref={ref} style={{ height: '50px' }} />}

      {/* ⭐️ (신규) FloatingButton 추가 */}
      <FloatingButton onClick={() => setIsModalOpen(true)}>+</FloatingButton>

      {/* ⭐️ (신규) 모달 컴포넌트 렌더링 (생성 모드) */}
      <LpPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default LpListPage;