import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Lp } from "../../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const formattedDate = lp.updatedAt.split("T")[0];
  return (
    <div
      className="relative hover:scale-105 transition-transform cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/lp/${lp.id}`)}
    >
      <div className="aspect-square w-full overflow-hidden rounded-lg shadow-md">
        <img
          src={lp.thumbnail}
          alt={`${lp.title}의 이미지`}
          className="w-full h-full object-cover transition-transform duration-300"
        />
      </div>

      {isHovered && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 rounded-b-lg">
          <h3 className="text-sm font-bold truncate">{lp.title}</h3>
          <div className="flex justify-between items-center text-xs mt-1">
            <span>{formattedDate}</span>
            <span>❤️ {lp.likes?.length ?? 0}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LpCard;
