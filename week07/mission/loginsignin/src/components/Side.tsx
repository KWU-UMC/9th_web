import { Link } from "react-router-dom"

type SideProps = {
  onOpenWithdrawal: React.Dispatch<React.SetStateAction<boolean>>
};

const Side = ({onOpenWithdrawal}: SideProps) => {
  return (
    <aside className="flex flex-col justify-between text-white font-semibold w-[200px] h-dvh bg-gray-900 sticky top-[64px] pb-25">
      <div className='flex flex-col gap-4 p-6'>
        <Link 
          to="/search"
        >찾기</Link>
        <Link 
          to="/my"
        >마이페이지</Link>
      </div>
      <button 
        className="text-lg cursor-pointer"
        onClick={() => onOpenWithdrawal(true)}
      >탈퇴하기</button>
    </aside>
  )
}

export default Side
