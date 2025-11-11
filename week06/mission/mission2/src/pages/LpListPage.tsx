import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query'; 
import { useInView } from 'react-intersection-observer'; 
import styled from 'styled-components';
// import { Link } from 'react-router-dom'; // ⭐️ FloatingButton을 안 쓰므로 삭제 가능
import { fetchLpsInfinite } from '../apis/lps'; 
import LpCard from '../components/LpCard';
import LpCardSkeleton from '../components/LpCardSkeleton'; 
import type { Lp } from '../apis/lps';

// (SortButton, GridContainer 스타일은 이전과 동일)
const SortButton = styled.button<{ $active: boolean }>`
  background-color: ${({ $active }) => ($active ? 'white' : 'transparent')};
  color: ${({ $active }) => ($active ? 'black' : 'white')};
  border: 1px solid white;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

/*
// ⭐️ FloatingButton 스타일은 삭제 (또는 주석 처리)
const FloatingButton = styled(Link)`
  ...
`;
*/

const LpListPage: React.FC = () => {
  const [sort, setSort] = useState<'recent' | 'oldest'>('recent');

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
    
    // ⭐️ (수정) Mock API에 맞게 null -> 1로 변경
    initialPageParam: 1, 
    
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    staleTime: 30_000,
    gcTime: 5 * 60 * 1000,
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) return (
    <div>
      에러: {error.message} <button onClick={() => refetch()}>재시도</button>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <SortButton
          $active={sort === 'oldest'}
          onClick={() => setSort('oldest')}
        >
          오래된순
        </SortButton>
        <SortButton
          $active={sort === 'recent'}
          onClick={() => setSort('recent')}
        >
          최신순
        </SortButton>
      </div>

      <GridContainer>
        {/* 초기 로딩 (isLoading) 시 스켈레톤 UI */}
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <LpCardSkeleton key={index} />
          ))
        ) : (
          // data.pages (2차원 배열)를 map으로 순회
          data?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.data.map((lp: Lp) => (
                <LpCard key={lp.id} lp={lp} />
              ))}
            </React.Fragment>
          ))
        )}

        {/* 추가 페이지 로딩 (isFetchingNextPage) 시 스켈레톤 UI */}
        {isFetchingNextPage &&
          Array.from({ length: 4 }).map((_, index) => (
            <LpCardSkeleton key={`loading-${index}`} />
          ))}
      </GridContainer>

      {/* 무한스크롤 트리거 요소 */}
      {hasNextPage && <div ref={ref} style={{ height: '50px' }} />}

      {/* ⭐️ FloatingButton 컴포넌트 삭제 (또는 주석 처리) */}
      {/* <FloatingButton to="/lp/new">+</FloatingButton> */}
    </div>
  );
};

export default LpListPage;