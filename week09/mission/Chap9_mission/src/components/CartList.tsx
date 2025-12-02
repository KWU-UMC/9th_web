import { CartItem } from "./CartItem";
import { PriceBox } from "./PriceBox";
import { ClearBtn } from "./ClearBtn";
import { useCartInfo } from "../hooks/useCartStore";


export const CartList = () => {
  const { cartItems } = useCartInfo();
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
