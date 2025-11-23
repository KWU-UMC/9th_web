import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/NavBar";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  if (!accessToken) {
    window.alert("로그인이 필요한 서비스입니다. 로그인을 해주세요");
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="h-dvh flex flex-col">
      <Navbar/>
      <main className="flex-1 mt-10">
          <Outlet/>
      </main>
    </div>);
};

export default ProtectedLayout;
