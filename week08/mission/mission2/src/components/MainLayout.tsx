import React, { useState } from 'react'; // ⭐️ useState 임포트
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainWrapper = styled.div`
  display: flex;
  flex: 1;
  background-color: #121212;
  color: white;
  overflow: hidden;
`;

const ContentWrapper = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const MainLayout: React.FC = () => {
  // ⭐️ 1. 사이드바 상태 관리 (미션 체크리스트)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AppWrapper>
      {/* ⭐️ 2. 헤더에 토글 함수 전달 */}
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <MainWrapper>
        {/* ⭐️ 3. 사이드바에 상태와 닫기 함수 전달 */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainWrapper>
    </AppWrapper>
  );
};

export default MainLayout;