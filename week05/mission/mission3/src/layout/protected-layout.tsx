import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function ProtectedLayout() {
  const { accessToken } = useAuth();

  if (!accessToken) {
    console.log("토큰 없으면 가라");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
