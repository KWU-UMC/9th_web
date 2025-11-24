import { useSelector } from "../hooks/useCustomRedux";

export const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);

  return (
    <h1 className="flex justify-end mt-3 text-lg font-extrabold ">
      총 가격: {total}원
    </h1>
  );
};
