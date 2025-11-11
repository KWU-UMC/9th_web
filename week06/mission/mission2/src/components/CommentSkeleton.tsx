import React from 'react';
import styled, { keyframes } from 'styled-components';

// ⭐️ LpCardSkeleton과 동일한 펄스 애니메이션
const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

// ⭐️ 댓글 모양 스켈레톤
const SkeletonWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1rem 0;
  border-bottom: 1px solid #282828;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const SkeletonAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #282828;
  flex-shrink: 0; // ⭐️ 줄어들지 않도록
`;

const SkeletonContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center; // ⭐️ 세로 중앙 정렬
  gap: 0.5rem;
`;

const SkeletonLine = styled.div<{ $width: string }>`
  width: ${props => props.$width};
  height: 16px;
  background-color: #282828;
  border-radius: 4px;
`;

const CommentSkeleton: React.FC = () => {
  return (
    <SkeletonWrapper>
      <SkeletonAvatar />
      <SkeletonContent>
        <SkeletonLine $width="30%" />
        <SkeletonLine $width="90%" />
      </SkeletonContent>
    </SkeletonWrapper>
  );
};

export default CommentSkeleton;