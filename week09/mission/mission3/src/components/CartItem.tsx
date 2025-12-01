import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { type CartItemType } from '../constants/cartItems';
import useCartStore from '../store/useCartStore'; // 👈 import

interface CartItemProps extends CartItemType {}

const CartItem = ({ id, title, singer, price, img, amount }: CartItemProps) => {
  // 👈 필요한 액션 함수들 가져오기
  const { increase, decrease, removeItem } = useCartStore();

  return (
    <article className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100 last:border-b-0">
      <div className="flex gap-6 items-center">
        <img 
            src={img} 
            alt={title} 
            className="w-20 h-20 object-cover rounded-md shadow-sm" 
        />
        <div className="flex flex-col gap-1">
          <h4 className="font-bold text-lg text-gray-900">{title}</h4>
          <h4 className="text-sm text-gray-500">{singer}</h4>
          <span className="text-gray-700 font-bold mt-1">₩ {parseInt(price).toLocaleString()}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          className="w-8 h-8 flex justify-center items-center bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition"
          onClick={() => {
            if (amount === 1) {
              removeItem(id);
              return;
            }
            decrease(id);
          }}
        >
          <ChevronDownIcon className="w-4 h-4" />
        </button>
        
        <span className="font-bold text-lg text-gray-700 w-6 text-center">{amount}</span>
        
        <button
          className="w-8 h-8 flex justify-center items-center bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition"
          onClick={() => increase(id)}
        >
          <ChevronUpIcon className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};

export default CartItem;