import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="p-4 min-w-screen bg-gray-900 min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
