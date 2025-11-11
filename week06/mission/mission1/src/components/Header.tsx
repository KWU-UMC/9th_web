import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
  position: relative; // ⭐️ z-index 적용을 위해
  z-index: 1010; // ⭐️ 사이드바보다 위에 오도록
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

  /* ⭐️ (미션) 모바일에서만 보이도록 (768px 이하) */
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

// ⭐️ 1. onToggleSidebar prop 타입 정의
interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <HeaderWrapper>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* ⭐️ 2. 버거 버튼에 onClick 이벤트 연결 */}
        <BurgerButton onClick={onToggleSidebar}>
          <BurgerIcon />
        </BurgerButton>
        <Logo to="/">돌려돌려LP판</Logo>
      </div>
      <NavArea>
        {isLoggedIn && user ? (
          <>
            <span>{user.name}님 반갑습니다.</span>
            <button onClick={logout}>로그아웃</button>
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