import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// ⭐️ 1. isOpen prop을 받도록 수정
const SidebarWrapper = styled.aside<{ isOpen: boolean }>`
  width: 240px;
  background-color: #000;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-right: 1px solid #282828;
  transition: transform 0.3s ease-in-out; // ⭐️ 애니메이션

  /* ⭐️ 2. (미션) 모바일 반응형 CSS */
  @media (max-width: 768px) {
    position: fixed; // 화면에 고정
    left: 0;
    top: 0; // 헤더 높이만큼 내릴 수도 있음 (top: 60px)
    height: 100%;
    z-index: 1000; // 헤더보다 아래, 콘텐츠보다 위
    
    /* isOpen 값에 따라 보이고 숨겨짐 */
    transform: ${({ isOpen }) =>
      isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #b3b3b3; text-decoration: none; font-size: 1rem; font-weight: bold;
  padding: 0.5rem; border-radius: 4px;
  &:hover { color: white; }
  &.active { background-color: #282828; color: white; }
`;

// ⭐️ 3. (미션) 사이드바 외부 클릭용 배경
const Backdrop = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999; // 사이드바보다 한 칸 아래

  /* 데스크탑에서는 필요 없음 */
  @media (min-width: 769px) {
    display: none;
  }
`;

// ⭐️ 4. props 타입 정의
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* ⭐️ 5. (미션) 외부 영역 클릭 시 onClose 함수 호출 */}
      <Backdrop isOpen={isOpen} onClick={onClose} />
      
      <SidebarWrapper isOpen={isOpen}>
        {/* ⭐️ 링크 클릭 시 사이드바 닫히도록 onClick={onClose} 추가 */}
        <StyledNavLink to="/" end onClick={onClose}>
          찾기
        </StyledNavLink>
        <StyledNavLink to="/mypage" onClick={onClose}>
          마이페이지
        </StyledNavLink>
        {/* ... */}
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;