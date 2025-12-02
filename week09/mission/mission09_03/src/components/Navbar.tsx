import { FaShoppingCart } from "react-icons/fa";
import useAppStore from "../store/useAppStore";

const Navbar = () => {
  const { amount } = useAppStore();

  return (
    <nav className="bg-slate-900">
      <div className="mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          onClick={() => {
            window.location.href = "/";
          }}
          className="text-2xl font-semibold text-white cursor-pointer"
        >
          Landy's Play Lists
        </h1>
        <div className="flex items-center gap-2">
          <FaShoppingCart className="text-2xl text-white" />
          <span className="text-xl font-medium text-white">{amount}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
