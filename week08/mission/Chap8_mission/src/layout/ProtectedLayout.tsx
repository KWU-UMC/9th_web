import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Layout from "./Layout";
import { useEffect, useRef } from "react";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation(); // 현재 위치
  const alertShownRef = useRef(false);

  useEffect(() => {
    if (!accessToken && !alertShownRef.current) {
      alert("로그인 후 이용 가능한 서비스입니다!");
      alertShownRef.current = true;
      localStorage.setItem("redirectURL", location.pathname);
    }
  }, [accessToken, location.pathname]);

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <>
      <Layout />
    </>
  );
};
export default ProtectedLayout;
