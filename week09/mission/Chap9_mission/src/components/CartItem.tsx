import type { Lp } from "../types/cart";
import { useCartActions } from "../hooks/useCartStore";

interface CartItemProps {
  lp: Lp;
}

export const CartItem = ({ lp }: CartItemProps) => {
  const { increase, decrease } = useCartActions();

  const handleIncrease = () => {
    // 수량 증가 액션 디스패치
    increase(lp.id);
  };

  const handleDecrease = () => {
    // 수량 감소 액션 디스패치
    decrease(lp.id);
  };

  return (
    <div
      key={lp.id}
      className="flex items-center gap-4 p-4 border-b border-gray-300"
    >
      <div className="flex items-center gap-4 flex-1">
        <img
          src={lp.img}
          alt={lp.title}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h2 className="font-semibold text-lg">{lp.title}</h2>
          <p className="text-gray-600">{lp.singer}</p>
          <p className="text-gray-800 font-bold">{lp.price}원</p>
        </div>
      </div>

      <div className="flex items-center">
        <button className="bg-gray-200 rounded-l-sm px-3 py-1 text-lg font-semibold cursor-pointer hover:bg-gray-400"
        onClick={handleDecrease}>
          -
        </button>
        <span className="mx-2 text-gray-600 font-semibold p-2">
          {lp.amount}
        </span>
        <button className="bg-gray-200 rounded-r-sm px-3 py-1 text-lg font-semibold cursor-pointer hover:bg-gray-400"
        onClick={handleIncrease}>
          +
        </button>
      </div>
    </div>
  );
};
