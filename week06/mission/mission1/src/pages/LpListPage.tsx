import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fetchLps } from '../apis/lps';
import LpCard from '../components/LpCard';
import type { Lp } from '../apis/lps'; // 'type' import 사용 확인

// ⭐️ 수정됨: prop 이름에 $ 추가 (active -> $active)
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

const FloatingButton = styled(Link)`
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
`;

const LpListPage: React.FC = () => {
  const [sort, setSort] = useState<'recent' | 'oldest'>('recent');

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['lps', sort],
    queryFn: () => fetchLps(sort),
    staleTime: 30_000,
    gcTime: 5 * 60 * 1000,
  });

  if (isPending) return <div>로딩 중...</div>;
  if (isError) return (
    <div>
      에러: {error.message} <button onClick={() => refetch()}>재시도</button>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {/* ⭐️ 수정됨: prop 이름에 $ 추가 (active -> $active) */}
        <SortButton
          $active={sort === 'oldest'}
          onClick={() => setSort('oldest')}
        >
          오래된순
        </SortButton>
        {/* ⭐️ 수정됨: prop 이름에 $ 추가 (active -> $active) */}
        <SortButton
          $active={sort === 'recent'}
          onClick={() => setSort('recent')}
        >
          최신순
        </SortButton>
      </div>

      <GridContainer>
        {data?.map((lp: Lp) => (
          <LpCard key={lp.id} lp={lp} />
        ))}
      </GridContainer>

      <FloatingButton to="/lp/new">+</FloatingButton>
    </div>
  );
};

export default LpListPage;