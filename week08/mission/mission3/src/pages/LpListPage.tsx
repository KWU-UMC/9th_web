import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
// 1. 앞에서 만든 useThrottle 가져오기
import { useThrottle } from '../hooks/useThrottle';
import { useDebounce } from '../hooks/useDebounce';
import { fetchLps, type Lp, type FetchLpsResponse } from '../apis/lps';
import LpCard from '../components/LpCard';

const PageWrapper = styled.div`
  padding: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 20px;
  border-radius: 24px;
  border: 1px solid #444;
  background-color: #222;
  color: white;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #f0f;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const LoadingTrigger = styled.div`
  width: 100%;
  height: 20px;
  margin-top: 20px;
`;

const LpListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [sort, setSort] = useState<'recent' | 'oldest'>('recent');

  // useInView 훅
  const { ref, inView } = useInView();

  // 2. useThrottle 적용 (1000ms = 1초)
  // inView 상태가 true로 변하더라도, 1초 동안은 throttledInView가 변하지 않음
  const throttledInView = useThrottle(inView, 1000);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error
  } = useInfiniteQuery<FetchLpsResponse>({
    queryKey: ['lps', sort, debouncedSearchTerm],
    queryFn: ({ pageParam = null }) => 
      fetchLps(sort, pageParam as number | null, debouncedSearchTerm),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
    enabled: true,
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 5,
  });

  // 3. 기존 useEffect 수정
  // inView 대신 throttledInView를 의존성으로 사용
  useEffect(() => {
    // throttledInView가 true일 때만 다음 페이지 요청
    if (throttledInView && hasNextPage) {
      console.log('Throttle 적용됨: 다음 페이지 요청'); // 검증용 로그
      fetchNextPage();
    }
  }, [throttledInView, hasNextPage, fetchNextPage]);

  return (
    <PageWrapper>
      <SearchInput
        type="text"
        placeholder="검색어를 입력하세요 (제목, 아티스트)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button onClick={() => setSort('recent')}>최신순</button>
        <button onClick={() => setSort('oldest')} style={{ marginLeft: '10px' }}>오래된순</button>
      </div>

      {status === 'pending' && <div>Loading...</div>}
      {status === 'error' && <div>Error: {error.message}</div>}

      <GridContainer>
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {/* 데이터가 없을 경우를 대비한 방어 코드 적용 */}
            {page?.data?.map((lp: Lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}
          </React.Fragment>
        ))}
      </GridContainer>

      {/* 무한 스크롤 트리거 */}
      <LoadingTrigger ref={ref}>
        {isFetchingNextPage && <div>Loading more...</div>}
      </LoadingTrigger>
    </PageWrapper>
  );
};

export default LpListPage;