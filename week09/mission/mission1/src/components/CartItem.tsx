import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { removeItem, increase, decrease } from '../features/cart/cartSlice';
import { type CartItemType } from '../constants/cartItems';

interface CartItemProps extends CartItemType {}

const CartItem = ({ id, title, singer, price, img, amount }: CartItemProps) => {
  const dispatch = useDispatch();

  return (
    // 전체 레이아웃: 사진처럼 깔끔한 가로 배치 (border-b로 구분선 추가)
    <article className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100 last:border-b-0">
      
      {/* 왼쪽: 이미지와 텍스트 정보 */}
      <div className="flex gap-6 items-center">
        <img 
            src={img} 
            alt={title} 
            className="w-20 h-20 object-cover rounded-md shadow-sm" // 이미지 크기 및 둥글기 조정
        />
        <div className="flex flex-col gap-1">
          <h4 className="font-bold text-lg text-gray-900">{title}</h4>
          <h4 className="text-sm text-gray-500">{singer}</h4>
          <span className="text-gray-700 font-bold mt-1">₩ {parseInt(price).toLocaleString()}</span>
        </div>
      </div>
      
      {/* 오른쪽: 수량 조절 버튼 (가로 배치) */}
      <div className="flex items-center gap-3">
        {/* 감소 버튼 */}
        <button
          className="w-8 h-8 flex justify-center items-center bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition"
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decrease(id));
          }}
        >
          {/* 심플한 - 아이콘 사용 */}
          <ChevronDownIcon className="w-4 h-4" />
        </button>
        
        {/* 수량 표시 */}
        <span className="font-bold text-lg text-gray-700 w-6 text-center">{amount}</span>
        
        {/* 증가 버튼 */}
        <button
          className="w-8 h-8 flex justify-center items-center bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition"
          onClick={() => dispatch(increase(id))}
        >
           {/* 심플한 + 아이콘 사용 (ChevronUp을 +처럼 사용하거나 PlusIcon으로 교체 가능) */}
          <ChevronUpIcon className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};

export default CartItem;