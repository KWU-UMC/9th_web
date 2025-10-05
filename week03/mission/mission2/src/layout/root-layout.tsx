import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="p-4 min-w-screen">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
