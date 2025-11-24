import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import DeleteUserModal from "./DeleteUserModal";
import type { RefObject } from "react";

type Props = {
  isOpen: boolean;
  sidebarRef: RefObject<HTMLDivElement | null>;
};

const Sidebar = ({ isOpen, sidebarRef }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(()=>{
    if(isOpen){
        document.body.style.overflow = "hidden";
    }else{
        document.body.style.overflow = "unset";
    }

    return () => {
        document.body.style.overflow = "unset"
    }
  },[isOpen])

  return (
    <div
      ref={sidebarRef}
      className={`fixed bg-neutral-800 text-white w-56 top-16 bottom-0 z-20 transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex flex-col justify-between h-full p-4">
        <div>
          <div className="text-lg font-bold mb-4">메뉴</div>

          <div className="flex flex-col gap-2">
            <NavLink
              to="/search"
              className="flex items-center gap-3 hover:text-indigo-400 font-semibold"
            >
              🔍 찾기
            </NavLink>
            <NavLink
              to="/my"
              className="flex items-center gap-3 hover:text-indigo-400 font-semibold"
            >
              👤 마이페이지
            </NavLink>
          </div>
        </div>

        <button onClick={() => setIsModalOpen(true)}>
          <h1 className="bg-red-400 p-2 rounded-md text-gray-300 font-bold hover:text-white hover:bg-red-600">
            탈퇴하기
          </h1>
        </button>

        {isModalOpen && (
          <DeleteUserModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;