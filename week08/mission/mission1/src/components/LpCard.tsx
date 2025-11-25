import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import type { Lp } from '../apis/lps';

const CardWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1 / 1; // 정사각형
  transition: transform 0.2s ease-in-out;
  background-color: #282828; // 이미지 로딩 전 배경

  /* ⭐️ (미션) 카드 Hover 시 확대 */
  &:hover {
    transform: scale(1.05);
    z-index: 10; // 다른 카드 위로 올라오도록

    /* ⭐️ (미션) 오버레이 노출 */
    & > div { 
      opacity: 1;
    }
  }
`;

const AlbumImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// ⭐️ (미션) Hover 시 나타날 메타 정보 오버레이
const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  padding: 1rem;
  opacity: 0; // 평소엔 숨김
  transition: opacity 0.2s ease-in-out;
  color: white;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetaInfo = styled.p`
  font-size: 0.8rem;
  margin: 0.25rem 0 0;
  color: #b3b3b3;
`;

interface LpCardProps {
  lp: Lp;
}

const LpCard: React.FC<LpCardProps> = ({ lp }) => {
  const navigate = useNavigate();

  // ⭐️ (미션) 카드를 클릭하면 해당 id로 /lp/:lpid 라우팅
  const handleClick = () => {
    navigate(`/lp/${lp.id}`);
  };

  return (
    <CardWrapper onClick={handleClick}>
      <AlbumImage src={lp.imageUrl} alt={lp.title} />
      <Overlay>
        <Title>{lp.title}</Title>
        <MetaInfo>{new Date(lp.createdAt).toLocaleDateString()}</MetaInfo>
        <MetaInfo>♥ {lp.likeCount}</MetaInfo>
      </Overlay>
    </CardWrapper>
  );
};

export default LpCard;