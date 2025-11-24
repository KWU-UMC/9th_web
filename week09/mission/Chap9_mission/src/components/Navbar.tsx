import { useEffect } from "react";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { calculateTotals } from "../slices/cartSlice";

export const Navbar = () => {
  const { amount, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white py-3 px-4 flex items-center justify-between z-50">
      <h1 className="font-bold text-2xl tracking-tight">Naru's Store</h1>
      <div className="flex gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 54 54"
          fill="none"
          className="size-8"
        >
          <path
            d="M38.25 40.5C35.7525 40.5 33.75 42.5025 33.75 45C33.75 46.1935 34.2241 47.3381 35.068 48.182C35.9119 49.0259 37.0565 49.5 38.25 49.5C39.4435 49.5 40.5881 49.0259 41.432 48.182C42.2759 47.3381 42.75 46.1935 42.75 45C42.75 43.8065 42.2759 42.6619 41.432 41.818C40.5881 40.9741 39.4435 40.5 38.25 40.5ZM2.25 4.5V9H6.75L14.85 26.0775L11.79 31.59C11.4525 32.22 11.25 32.9625 11.25 33.75C11.25 34.9435 11.7241 36.0881 12.568 36.932C13.4119 37.7759 14.5565 38.25 15.75 38.25H42.75V33.75H16.695C16.5458 33.75 16.4027 33.6907 16.2973 33.5852C16.1918 33.4798 16.1325 33.3367 16.1325 33.1875C16.1325 33.075 16.155 32.985 16.2 32.9175L18.225 29.25H34.9875C36.675 29.25 38.16 28.305 38.925 26.9325L46.98 12.375C47.1375 12.015 47.25 11.6325 47.25 11.25C47.25 10.6533 47.0129 10.081 46.591 9.65901C46.169 9.23705 45.5967 9 45 9H11.7225L9.6075 4.5M15.75 40.5C13.2525 40.5 11.25 42.5025 11.25 45C11.25 46.1935 11.7241 47.3381 12.568 48.182C13.4119 49.0259 14.5565 49.5 15.75 49.5C16.9435 49.5 18.0881 49.0259 18.932 48.182C19.7759 47.3381 20.25 46.1935 20.25 45C20.25 43.8065 19.7759 42.6619 18.932 41.818C18.0881 40.9741 16.9435 40.5 15.75 40.5Z"
            fill="white"
          />
        </svg>
        <h1 className="font-semibold text-lg">{amount}</h1>
      </div>
    </nav>
  );
};
