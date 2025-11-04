// src/router/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

// ➜ 인증이 필요한 페이지를 감싸는 컴포넌트
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // 1) 토큰 확인 (임시로 localStorage 사용)
  const token = localStorage.getItem("accessToken");

  // 2) 지금 사용자가 어디로 가려는 중인지 기억
  const location = useLocation();

  // 3) 토큰 없으면 로그인으로 보내기
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // 로그인 후 다시 돌아오게 하기 위함
      />
    );
  }

  // 4) 토큰 있으면 실제 페이지 렌더
  return <>{children}</>;
}
