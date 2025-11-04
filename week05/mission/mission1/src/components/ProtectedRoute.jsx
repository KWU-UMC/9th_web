import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const token = localStorage.getItem('accessToken'); 
  const isLoggedIn = !!token; 

  // 테스트용:
  // const isLoggedIn = false; 
  // const isLoggedIn = true;

  return isLoggedIn;
};

const ProtectedRoute = () => {
  const isLoggedIn = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;