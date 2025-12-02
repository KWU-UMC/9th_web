import useAppStore from "../store/useAppStore";

const PriceBox = () => {
  const { total, openModal } = useAppStore();

  const handleInitializeCart = () => {
    openModal();
  };

  return (
    <div className="relative p-12 flex justify-end items-center">
      <button
        onClick={handleInitializeCart}
        className="absolute left-1/2 -translate-x-1/2 rounded-md bg-red-600 px-6 py-3 text-white font-semibold shadow hover:bg-red-700 transition-colors cursor-pointer"
      >
        전체 삭제
      </button>
      <div className="text-lg font-semibold">총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
