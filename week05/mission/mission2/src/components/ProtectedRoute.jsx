import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// 1. useAuth는 더 이상 여기서 필요 없습니다.
// import { useAuth } from '../context/AuthContext'; 

const ProtectedLayout = () => {
  // 2. useAuth() 대신 localStorage에서 토큰을 직접 가져옵니다.
  const token = localStorage.getItem('accessToken');
  const isLoggedIn = !!token;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;