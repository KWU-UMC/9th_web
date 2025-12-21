import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PlusButton from "../components/PlusButton";

import { useSidebar } from "../hooks/useSidebar";

const RootLayout = () => {
  const { close, isOpen, toggle } = useSidebar();
  return (
    <div className="flex flex-col h-screen">
      <Navbar handleToggle={toggle} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} onClose={close} />
        <main className="flex-1 overflow-auto">
          <Outlet />
          <PlusButton />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
