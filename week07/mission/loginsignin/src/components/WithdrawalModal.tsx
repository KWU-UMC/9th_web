import { X } from "lucide-react";
import { useDeleteUser } from "../hooks/mutations/useDeleteUser";

type WithdrawalModalProps = {
  onCloseWithdrawal: React.Dispatch<React.SetStateAction<boolean>>
};

const WithdrawalModal = ({onCloseWithdrawal}: WithdrawalModalProps) => {
  const {mutate} = useDeleteUser();

  return (
    <div className="inset-0 fixed z-50 flex items-center justify-center items-center" onClick={() => onCloseWithdrawal(false)}>
      <div 
        className='absolute inset-0 bg-black/50 z-40'
      />
      <div
        className="flex flex-col gap-10 relative z-50 w-full max-w-[640px] max-h-[90vh] bg-gray-800 min-w-[30rem] text-white p-8 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <div/>
          <button
            onClick={() => onCloseWithdrawal(false)}
          >
            <X />
          </button>
        </div>
        <h1 className="text-center text-xl mt-5">정말 탈퇴하시겠습니까?</h1>
        <div className="flex gap-10 justify-center mb-10">
          <button
            className="bg-gray-200 text-black w-[100px] rounded-md cursor-pointer"
            onClick={() => mutate()}
          >
            예
          </button>
          <button
            className="bg-pink-500 w-[100px] rounded-md cursor-pointer"
            onClick={() => onCloseWithdrawal(false)}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  )
}

export default WithdrawalModal
