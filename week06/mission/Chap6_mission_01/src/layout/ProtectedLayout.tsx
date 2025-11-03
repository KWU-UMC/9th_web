import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useEffect, useRef } from "react";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation(); // 현재 위치
  const alertShownRef = useRef(false);

  useEffect(() => {
    if (!accessToken && !alertShownRef.current) {
      alert("로그인 후 이용 가능한 서비스입니다!");
      alertShownRef.current = true; // 한 번만 실행되도록 설정
      // 로그인 후 돌아올 경로 저장
      localStorage.setItem("redirectURL", location.pathname);
    }
  }, [accessToken, location.pathname]);

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default ProtectedLayout;
