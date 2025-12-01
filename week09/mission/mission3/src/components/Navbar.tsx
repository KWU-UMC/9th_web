import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import useCartStore from '../store/useCartStore'; // 👈 import

const Navbar = () => {
  // 👈 구조분해 할당으로 필요한 값만 쏙!
  const { amount } = useCartStore();

  return (
    <nav className="bg-slate-900 py-4 px-8 text-white mb-10 sticky top-0 z-50 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h3 className="text-2xl font-bold">Ohtani Ahn</h3>
        <div className="relative cursor-pointer">
          <ShoppingCartIcon className="h-8 w-8 text-white" />
          <div className="absolute -top-2 -right-2 bg-slate-500 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold text-white">
            {amount}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;