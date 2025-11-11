// src/layouts/ProtectedLayout.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);

  useEffect(() => {
    const onResize = () => setSidebarOpen(window.innerWidth >= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((v) => !v);

  // 인증이 없으면 로그인 페이지로
  if (!accessToken) return <Navigate to="/login" replace />;

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <Navbar onToggleSidebar={toggleSidebar} />
      </header>

      <div className="flex flex-1 min-h-0">
        <Sidebar open={sidebarOpen} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
