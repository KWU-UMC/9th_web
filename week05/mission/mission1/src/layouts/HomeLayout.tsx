import React from 'react';
import { Outlet } from 'react-router-dom';

// Outlet: App.tsx에서 HomeLayout의 자식으로 정의된
// <HomePage />나 <LoginPage />가 렌더링되는 위치입니다.
const HomeLayout = () => {
  return (
    <div>
      {/* <Header />  // 공통 헤더가 있다면 여기에 위치 */}
      <main>
        <Outlet />
      </main>
      {/* <Footer />  // 공통 푸터가 있다면 여기에 위치 */}
    </div>
  );
};

export default HomeLayout;