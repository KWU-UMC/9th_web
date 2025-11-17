// src/components/Sidebar.tsx
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useDeleteAccount } from '../hooks/mutations/useAuthMutations'; // 4-2 탈퇴 훅

// ⭐️ 1. [수정] prop 이름을 isOpen -> $isOpen 으로 변경
const SidebarWrapper = styled.aside<{ $isOpen: boolean }>`
  width: 240px;
  background-color: #000;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-right: 1px solid #282828;
  transition: transform 0.3s ease-in-out; 

  @media (max-width: 768px) {
    position: fixed; 
    left: 0;
    top: 0; 
    height: 100%;
    z-index: 1000; 
    
    /* ⭐️ 2. [수정] transform에서 $isOpen 사용 */
    transform: ${({ $isOpen }) =>
      $isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #b3b3b3; text-decoration: none; font-size: 1rem; font-weight: bold;
  padding: 0.5rem; border-radius: 4px;
  &:hover { color: white; }
  &.active { background-color: #282828; color: white; }
`;

// ⭐️ 3. [수정] prop 이름을 isOpen -> $isOpen 으로 변경
const Backdrop = styled.div<{ $isOpen: boolean }>`
  /* ⭐️ 4. [수정] display에서 $isOpen 사용 */
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999; 

  @media (min-width: 769px) {
    display: none;
  }
`;

// (신규) 탈퇴 버튼 스타일 (4-5 단계)
const DangerButton = styled.button`
  color: #ff4d4d;
  background: none;
  border: 1px solid #ff4d4d;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  font-weight: bold;
  margin-top: auto; /* 사이드바 하단에 배치 */
  font-size: 0.9rem;

  &:hover {
    background-color: rgba(255, 77, 77, 0.1);
  }
  &:disabled {
    color: #535353;
    border-color: #535353;
    background: none;
    cursor: not-allowed;
  }
`;

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  // (신규) 탈퇴 훅 (4-5 단계)
  const { mutate: deleteAccountMutate, isPending } = useDeleteAccount();

  // (신규) 탈퇴 핸들러 (4-5 단계)
  const handleDeleteAccount = () => {
    if (window.confirm(
        '정말 탈퇴하시겠습니까?\n모든 LP와 정보가 영구적으로 삭제됩니다. (Mock)'
      )
    ) {
      deleteAccountMutate();
    }
  };

  return (
    <>
      {/* ⭐️ 5. [수정] Backdrop에 $isOpen prop 전달 */}
      <Backdrop $isOpen={isOpen} onClick={onClose} />
      
      {/* ⭐️ 6. [수정] SidebarWrapper에 $isOpen prop 전달 */}
      <SidebarWrapper $isOpen={isOpen}>
        <StyledNavLink to="/" end onClick={onClose}>
          찾기
        </StyledNavLink>
        <StyledNavLink to="/mypage" onClick={onClose}>
          마이페이지
        </StyledNavLink>
        
        {/* (신규) 탈퇴하기 버튼 추가 (4-5 단계) */}
        <DangerButton onClick={handleDeleteAccount} disabled={isPending}>
          {isPending ? '탈퇴 처리 중...' : '탈퇴하기'}
        </DangerButton>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;