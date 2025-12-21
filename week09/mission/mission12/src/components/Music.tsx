import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { increase, decrease, removeItem } from "../redux/cartSlice";
import { ChevronDown, ChevronUp } from "../constants/icons";

interface MusicProps {
  id: string;
}

const Music: React.FC<MusicProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const item = cart.cartItems.find((e) => e.id === id);

  const handleIncrease = () => {
    dispatch(increase(id));
  };

  const handleDecrease = () => {
    if (item && item.amount > 1) {
      dispatch(decrease(id));
    } else {
      dispatch(removeItem(id));
    }
  };

  if (!item) {
    return null;
  }

  return (
    <div className="text-4xl w-[60vw] h-[100px] flex justify-between items-center mb-5">
      <img src={item.img} alt={item.title} className="w-20 h-20 mr-5" />
      <div className="flex-1 flex flex-col text-xl">
        <div>
          {item.title} | {item.singer}
        </div>
        <div className="text-lg text-gray-500">₩ {item.price}</div>
      </div>
      <div className="flex flex-col text-[27px] text-[rgb(87,80,253)] items-center">
        <button
          onClick={handleIncrease}
          className="flex flex-col text-[27px] bg-transparent border-none text-[rgb(87,80,253)] cursor-pointer hover:scale-110 transition-transform"
        >
          <ChevronUp />
        </button>
        {item.amount}
        <button
          onClick={handleDecrease}
          className="flex flex-col text-[27px] bg-transparent border-none text-[rgb(87,80,253)] cursor-pointer hover:scale-110 transition-transform"
        >
          <ChevronDown />
        </button>
      </div>
    </div>
  );
};

export default Music;
