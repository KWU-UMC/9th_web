import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PlusButton from "../components/PlusButton";
import { useState } from "react";

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Navbar handleToggle={() => setIsOpen(!isOpen)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <main className="flex-1 overflow-auto">
          <Outlet />
          <PlusButton />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
