import { useState } from "react";
import AddLpModal from "./AddLpModal";

const AddBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      {/* + 버튼 */}
      <button
        onClick={handleAddModal}
        className="group fixed bottom-6 right-6 z-50 flex items-center justify-center 
                   w-14 h-14 bg-white rounded-full shadow-lg 
                   hover:bg-blue-700 transform transition-all duration-200 
                   hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-blue-700 transition-colors duration-200 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* 모달 */}
      {isModalOpen && <AddLpModal onClose={handleCloseModal} />}
    </>
  );
};

export default AddBtn;
