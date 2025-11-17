import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedLayout = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // ⭐️ (미션) 비로그인 사용자가 상세 URL 접근 시
    if (!isLoggedIn) {
      
      // ⭐️ (미션) 경고 모달 띄우기
      alert('로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.');

      // ⭐️ (미션) 확인 시 /login으로 라우팅 (로그인 후 복귀되도록 state 전달)
      navigate('/login', {
        replace: true, // 뒤로가기 시 이 페이지로 돌아오지 않도록
        state: { from: location }, // ⭐️ (미션) 복귀할 현재 위치(경로) 전달
      });
    }
  }, [isLoggedIn, location, navigate]); // 의존성 배열 확인

  // 1. 로그인이 안됐으면:
  //    useEffect가 실행되어 alert이 뜬 후 /login으로 리다이렉트됨.
  //    그 동안은 null을 렌더링해서 자식 컴포넌트(LpDetailPage)가 렌더링/API 호출되는 것을 막음.
  if (!isLoggedIn) {
    return null;
  }

  // 2. 로그인이 됐으면:
  //    useEffect는 아무것도 안 하고, 자식 페이지(<Outlet />)를 보여줌.
  return <Outlet />;
};

export default ProtectedLayout;