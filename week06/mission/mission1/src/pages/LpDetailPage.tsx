import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchLpDetail } from '../apis/lps';
import type { LpDetail } from '../apis/lps';

// ⭐️ (미션) 상세 화면 레이아웃
const DetailWrapper = styled.div`
  display: flex;
  gap: 2rem;
  color: white;

  /* 모바일에서는 세로 배치 */
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
  white-space: pre-wrap; // 띄어쓰기와 줄바꿈 유지
`;

// ⭐️ (미션) 수정/삭제/좋아요 버튼 UI
const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto; /* ⭐️ 버튼을 항상 하단에 배치 */
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

  &:hover {
    background-color: #383838;
  }
`;

const LpDetailPage: React.FC = () => {
  const { lpid } = useParams<{ lpid: string }>();

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['lp', lpid],
    queryFn: () => fetchLpDetail(lpid!),
    enabled: !!lpid && lpid !== 'new', // lpid가 'new'가 아닐 때만 실행
  });

  // ⭐️ (미션) 로딩/에러 상태
  if (isPending) return <div>로딩 중...</div>;
  if (isError) return (
    <div>
      에러: {error.message} <button onClick={() => refetch()}>재시도</button>
    </div>
  );

  // ⭐️ data가 없는 모든 경우(enabled: false 포함) 체크
  if (!data) return null;

  return (
    <DetailWrapper>
      <Thumbnail src={data.imageUrl} alt={data.title} />
      <InfoWrapper>
        <Title>{data.title}</Title>
        <MetaInfo>아티스트: {data.artist || '정보 없음'}</MetaInfo>
        <MetaInfo>업로드: {new Date(data.createdAt).toLocaleDateString()}</MetaInfo>
        <MetaInfo>♥ {data.likeCount}</MetaInfo>

        <Body>{data.content || '본문 내용이 없습니다.'}</Body>

        <ButtonWrapper>
          <Button>수정</Button>
          <Button>삭제</Button>
          <Button>좋아요</Button>
        </ButtonWrapper>
      </InfoWrapper>
    </DetailWrapper>
  );
};

export default LpDetailPage;