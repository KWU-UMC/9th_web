import useAppStore from "../store/useAppStore";
import CartItem from "./CartItems";

const CartList = () => {
  const { cartItems } = useAppStore();

  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;
