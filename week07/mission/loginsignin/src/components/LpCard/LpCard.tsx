import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"
import type { Lp } from "../../types/lp"

interface LpCardProps {
  lp: Lp
};

const LpCard = ({lp}: LpCardProps) => {
  const {accessToken} = useAuth();
  const navigate = useNavigate();

  const handleLpCardClick = (id: number): void => {
    const target = `/lps/${id}`
    if (!accessToken){
      alert("로그인이 필요한 서비스입니다. 로그인 해주세요.");
      localStorage.setItem("postLoginRedirect", target);
    }

    navigate(target);
  }

  return (
    <div className="group relative cursor-pointer" onClick={() => handleLpCardClick(lp.id)}>
      <img 
        className='w-[200px] h-full aspect-square overflow-hidden group-hover:scale-110' 
        src={lp.thumbnail} 
        alt={lp.title}
      />

      <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 group-hover:bg-black/50 text-white group-hover:scale-110 p-2">
        <h1 className="text-lg font-semibold truncate">{lp.title}</h1>
        <div className="flex justify-between text-ms">
          <p>{new Date(lp.updatedAt).toLocaleDateString()}</p>
          <p>❤️ {lp.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default LpCard
