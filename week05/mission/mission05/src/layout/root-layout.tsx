import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      {/* 화면 전체 너비/높이 사용 */}
      <div className="w-full min-h-dvh bg-gray-900 p-4">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
