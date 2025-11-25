import React, { useState, useEffect } from 'react';
import { useInfiniteQuery, type FetchInfiniteQueryOptions } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer'; // 무한 스크롤 감지용 (npm install react-intersection-observer 필요)
import styled from 'styled-components';
import { fetchLps, type FetchLpsResponse, type Lp } from '../apis/lps'; // 2단계에서 수정한 API import
import LpCard from '../components/LpCard';
import { useDebounce } from '../hooks/useDebounce'; // 1단계에서 만든 훅 import

// 스타일 컴포넌트들
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
  // 1. 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState('');
  
  // 2. useDebounce 적용 (300ms 지연)
  // 사용자가 입력을 멈추고 0.3초 뒤에 debouncedSearchTerm이 업데이트됨
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [sort, setSort] = useState<'recent' | 'oldest'>('recent');

  // 무한 스크롤 감지용 ref (화면 맨 아래 닿았는지 확인)
  const { ref, inView } = useInView();

  // 3. useInfiniteQuery 사용
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error
  } = useInfiniteQuery<FetchLpsResponse>({
    // queryKey에 debouncedSearchTerm을 포함시켜야 검색어가 바뀔 때마다 새로운 쿼리가 실행됨
    queryKey: ['lps', sort, debouncedSearchTerm],
    
    queryFn: ({ pageParam = null }) => 
      fetchLps(sort, pageParam as number | null, debouncedSearchTerm),
    
    initialPageParam: null, // 첫 페이지 커서
    
    // 다음 페이지 커서 결정 로직
    getNextPageParam: (lastPage) => {
      // lastPage.nextCursor가 있으면 반환, 없으면 undefined (끝)
      return lastPage.nextCursor ?? undefined;
    },

    // 체크리스트: 빈 문자열/공백만 입력일 때 요청 막기 (선택 사항)
    // 검색어가 없어도 전체 목록을 보여줘야 한다면 enabled: true로 설정
    // 여기서는 항상 true로 하되, API 함수 내부에서 빈 문자열 처리를 함
    enabled: true, 

    // 체크리스트: 불필요한 재요청 줄이기
    staleTime: 1000 * 60 * 1, // 1분간 데이터가 신선하다고 간주 (재요청 안 함)
    gcTime: 1000 * 60 * 5,    // 5분간 캐시 유지
  });

  // 무한 스크롤 트리거 감지
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 디바운싱 동작 확인용 콘솔 (체크리스트)
  useEffect(() => {
    console.log('실제 검색 요청에 사용되는 단어:', debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <PageWrapper>
      {/* 검색창 */}
      <SearchInput
        type="text"
        placeholder="검색어를 입력하세요 (제목, 아티스트)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 정렬 버튼 영역 (생략 가능) */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button onClick={() => setSort('recent')}>최신순</button>
        <button onClick={() => setSort('oldest')} style={{ marginLeft: '10px' }}>오래된순</button>
      </div>

      {/* 로딩 및 에러 처리 */}
      {status === 'pending' && <div>Loading...</div>}
      {status === 'error' && <div>Error: {error.message}</div>}

      {/* 데이터 렌더링 */}
      <GridContainer>
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page?.data?.map((lp: Lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}
          </React.Fragment>
        ))}
      </GridContainer>

      {/* 무한 스크롤 트리거 (로딩 표시) */}
      <LoadingTrigger ref={ref}>
        {isFetchingNextPage && <div>Loading more...</div>}
      </LoadingTrigger>
    </PageWrapper>
  );
};

export default LpListPage;