// src/components/Header.tsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLogout } from '../hooks/mutations/useAuthMutations'; // 4-2 로그아웃 훅

// (스타일 코드)
const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #000;
  color: white;
  border-bottom: 1px solid #282828;
  height: 60px;
  position: relative;
  z-index: 1010;
`;
const Logo = styled(Link)`
  font-size: 1.5rem; font-weight: bold; color: #f0f; text-decoration: none;
`;
const NavArea = styled.nav`
  display: flex; align-items: center; gap: 1.5rem;
`;
const AuthLink = styled(Link)`
  color: white; text-decoration: none;
  &:hover { text-decoration: underline; }
`;

// ⭐️ [수정] 이 부분이 오류였습니다.
// 6주차 코드와 동일하게 styled(AuthLink)로 수정합니다.
const SignUpButton = styled(AuthLink)`
  background-color: #f0f; color: black; font-weight: bold;
  padding: 0.5rem 1rem; border-radius: 20px;
`;

// ⭐️ (미션) 버거 아이콘 SVG 코드
const BurgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M7.95 11.95h32m-32 12h32m-32 12h32"/>
  </svg>
);

const BurgerButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;

  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { isLoggedIn, user } = useAuth();
  
  // 4-4 단계에서 추가한 로그아웃 훅
  const { mutate: logoutMutate, isPending } = useLogout();

  return (
    <HeaderWrapper>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <BurgerButton onClick={onToggleSidebar}>
          <BurgerIcon />
        </BurgerButton>
        <Logo to="/">돌려돌려LP판</Logo>
      </div>
      
      <NavArea>
        {isLoggedIn && user ? (
          <>
            <span>{user.name}님 반갑습니다.</span>
            {/* 4-4 단계에서 수정한 로그아웃 버튼 */}
            <button onClick={() => logoutMutate()} disabled={isPending}>
              {isPending ? '로그아웃 중...' : '로그아웃'}
            </button>
          </>
        ) : (
          <>
            <AuthLink to="/login">로그인</AuthLink>
            <SignUpButton to="/signup">회원가입</SignUpButton>
          </>
        )}
      </NavArea>
    </HeaderWrapper>
  );
};

export default Header;