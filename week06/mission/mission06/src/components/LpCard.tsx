import { useNavigate } from "react-router-dom";
import type { Lp } from "../types/lp";

interface LpCardProps { lp: Lp }

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();

  const goDetail = () => navigate(`/lps/${lp.id}`);

  return (
    <div
      className="group relative cursor-pointer w-[200px]"
      onClick={goDetail}
      title={lp.title}
    >
      <img
        className="w-[200px] h-[200px] rounded object-cover transition-transform group-hover:scale-110"
        src={lp.thumbnail}
        alt={lp.title}
        loading="lazy"
        decoding="async"
        width={200}
        height={200}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/fallback.png";
          // 실패 이후에는 더 이상 onError 루프를 만들지 않도록 핸들러 제거 (안전장치)
          e.currentTarget.onerror = null;
        }}
      />

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 group-hover:bg-black/50 text-white p-2 transition-opacity rounded">
        <h1 className="text-sm font-semibold truncate">{lp.title}</h1>
        <div className="flex justify-between text-xs">
          <time>{new Date(lp.updatedAt).toLocaleDateString()}</time>
          <span>❤️ {lp.likes?.length ?? 0}</span>
        </div>
      </div>
    </div>
  );
};

export default LpCard;