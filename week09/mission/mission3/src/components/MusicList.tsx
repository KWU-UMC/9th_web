import React, { useEffect } from "react";

import Music from "./Music";
import CustomModal from "./CustomModal";
import MoonLoader from "react-spinners/MoonLoader";

import useCartStore from "../zustand/useCartStore";
import useModalState from "../zustand/useModalState";

export default function MusicList() {
  const { openModal } = useModalState();
  const { loading, calculateTotals, cartItems, total } = useCartStore();

  useEffect(() => {
    calculateTotals();
  }, [cartItems]);

  const handleOpenModal = () => {
    openModal();
  };

  if (loading === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <MoonLoader color={"green"} loading={true} size={100} />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-[70vw] h-[1935px]">
        <div className="text-4xl mt-[70px] mb-[30px]">당신이 선택한 음반</div>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((e) => (
              <Music key={e.id} id={e.id} />
            ))}
            <div className="my-5 mt-[50px] bg-gray-500 w-[70vw] h-0.5" />
            <div className="px-[50px] flex w-[70vw] text-xl">
              <div>총 가격</div>
              <div className="flex-1" />
              <div>₩ {total}</div>
            </div>
            <button
              onClick={handleOpenModal}
              className="bg-transparent w-[200px] h-10 flex items-center justify-center border-2 border-solid border-red-500 rounded-md text-red-500 mb-[50px] mt-5 cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
            >
              장바구니 초기화
            </button>
          </>
        ) : (
          <div className="text-xl text-gray-600">
            고객님이 좋아하는 음반을 담아보세요~!
          </div>
        )}
      </div>
      <CustomModal />
    </div>
  );
}
