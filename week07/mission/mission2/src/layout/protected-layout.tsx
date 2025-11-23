// components/ProtectedLayout.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function ProtectedLayout() {
  const { accessToken } = useAuth();
  const location = useLocation();

  if (!accessToken) {
    // 현재 경로를 state로 전달
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}
