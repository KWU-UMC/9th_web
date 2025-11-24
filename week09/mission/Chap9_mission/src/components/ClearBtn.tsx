import { useDispatch } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";

export const ClearBtn = () => {
  const dispatch = useDispatch();

  const handleClearCart = () => {
    // 수량 증가 액션 디스패치
    dispatch(clearCart());
  };

  return (
    <button
      className="mt-6 w-full bg-red-100 text-white py-3 rounded-md font-semibold hover:bg-red-600 transition-colors"
      onClick={handleClearCart}
    >
      전체 삭제하기
    </button>
  );
};
