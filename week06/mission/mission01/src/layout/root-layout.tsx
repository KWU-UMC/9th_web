// src/layout/root-layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);

  useEffect(() => {
    const onResize = () => {
      // 화면이 작아지면 자동으로 닫아주고, 커지면 기본 열림 상태로
      setSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(v => !v);

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
}
