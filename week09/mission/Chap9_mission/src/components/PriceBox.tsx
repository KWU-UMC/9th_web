import { useCartInfo } from "../hooks/useCartStore";

export const PriceBox = () => {
  const { total } = useCartInfo();

  return (
    <h1 className="flex justify-end mt-3 text-lg font-extrabold ">
      총 가격: {total}원
    </h1>
  );
};
