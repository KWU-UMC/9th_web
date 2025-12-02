import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { openModal } from "../features/modal/modalSlice";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleInitializeCart = () => {
    dispatch(openModal());
  };

  return (
    <div className="relative p-12 flex justify-end items-center">
      <button
        onClick={handleInitializeCart}
        className="absolute left-1/2 -translate-x-1/2 rounded-md bg-red-600 px-6 py-3 text-white font-semibold shadow hover:bg-red-700 transition-colors cursor-pointer"
      >
        {"\uC804\uCCB4 \uC0AD\uC81C"}
      </button>
      <div className="text-lg font-semibold">
        {"\uCD1D \uAC00\uACA9: "}{total}{"\uC6D0"}
      </div>
    </div>
  );
};

export default PriceBox;
