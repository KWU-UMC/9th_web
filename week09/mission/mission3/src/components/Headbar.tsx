import { CartIcon } from "../constants/icons";

import useCartStore from "../zustand/useCartStore";
const HeadBar = () => {
  const { amount } = useCartStore();
  return (
    <div className="bg-slate-800 h-20 flex text-white items-center px-[150px] justify-between">
      <div className="text-3xl font-bold">PlayList</div>
      <div className="text-white flex">
        <CartIcon />
        {amount}
      </div>
    </div>
  );
};

export default HeadBar;
