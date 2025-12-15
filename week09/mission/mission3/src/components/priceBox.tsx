import { useCartInfo } from "../hooks/useCartStore";
import { useModalStore } from "../hooks/useModalStore";

const PriceBox = () => {
    const { total } = useCartInfo();
    const { openModal } = useModalStore();
    
    const handleModal = () =>{
        openModal();
    }

    return (
    <div className="p-12 flex justify-end">
        <div className="p-12 flex justify-between">
            <button onClick={handleModal} className="border p-4 rounded-md cursor-pointer">장바구니 초기화</button>
        </div>
        <div>총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;