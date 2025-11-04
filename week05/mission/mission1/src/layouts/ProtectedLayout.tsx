import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. AuthContext 훅 가져오기

const ProtectedLayout = () => {
  const { isLoggedIn } = useAuth(); // 2. Context에서 로그인 상태 가져오기

  // 3. 로그인 안됐으면 로그인 페이지로
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 4. 로그인 됐으면 자식 페이지 보여주기
  return <Outlet />;
};

export default ProtectedLayout;