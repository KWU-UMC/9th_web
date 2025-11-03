import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Guard = () => {
  const { accessToken } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다. 로그인 해주세요!");
      localStorage.setItem("postLoginRedirect", location.pathname + location.search);
    }
  }, [accessToken, location]);

  if (!accessToken) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default Guard;
