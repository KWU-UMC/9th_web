import { Outlet } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useSidebar } from "../hooks/useSidebar";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  const { isOpen, toggle, close, open } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 브라우저 너비에 따른 사이드바 자동 열림/닫힘
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) open();
      else close();
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [close, open]);

  // 사이드바 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        close(); // 모든 화면에서 닫힘
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [close]); // close를 의존성으로 추가

  // ESC 키 눌렀을 때 사이드바 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown); // 클린업
  }, [close]);

  return (
    <div>
      <Navbar buttonRef={buttonRef} onToggleSidebar={toggle} />
      <Sidebar isOpen={isOpen} sidebarRef={sidebarRef} />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
