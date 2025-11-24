import { CartItem } from "./CartItem";
import { PriceBox } from "./PriceBox";
import { ClearBtn } from "./ClearBtn";
import { useSelector } from "../hooks/useCustomRedux";

export const CartList = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="max-w-3xl mx-auto mt-16 mb-5 p-6 bg-white rounded-lg shadow-md">
      {cartItems.map((item) => (
        <CartItem key={item.id} lp={item} />
      ))}
      <PriceBox />
      <ClearBtn />
    </div>
  );
};
