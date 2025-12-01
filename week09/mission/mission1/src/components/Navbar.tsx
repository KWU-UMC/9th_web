import { useSelector } from 'react-redux';
import { type RootState } from '../store/store';
import { ShoppingCartIcon } from '@heroicons/react/24/solid'; // 아이콘 변경

const Navbar = () => {
  const { amount } = useSelector((store: RootState) => store.cart);

  return (
    // 색상을 사진과 같은 진한 남색(#212529와 유사한 slate-900)으로 변경
    <nav className="bg-slate-900 py-4 px-8 text-white mb-10 sticky top-0 z-50 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* 사진 속 텍스트 반영 */}
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