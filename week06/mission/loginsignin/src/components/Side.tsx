import { Link } from "react-router-dom"

const Side = () => {
  return (
    <aside className='flex flex-col gap-4 text-white p-6 font-semibold w-[200px] h-dvh bg-gray-900 sticky top-[64px]'>
      <Link 
        to="/search"
        className="text-white"
      >찾기</Link>
      <Link 
        to="/my"
        className="text-white"
      >마이페이지</Link>
    </aside>
  )
}

export default Side
