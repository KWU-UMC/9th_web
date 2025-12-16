import { useState } from "react";
import type { Lp } from "../../types/lp";
import { useNavigate } from "react-router-dom";

interface LpCardProps {
    lp : Lp;
}

const LpCard = ({lp} : LpCardProps) => {
    const [isHover, setIshover] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            <div key={lp.id} className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300" onMouseEnter={():void => setIshover(true)} onMouseLeave={():void=>setIshover(false)} onClick={() => navigate(`/lp/${lp.id}`)}>
              <div className="relative w-full aspect-[4/3] bg-black">
                <img
                  src={lp.thumbnail}
                  alt={lp.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {isHover && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 to-transparent backdrop-blur-md flex flex-col justify-end p-4">

                    <h2 className="text-sm font-bold text-white">{lp.title}</h2>

                    <p className="text-xs mt-1 line-clamp-3 text-gray-300">
                      {new Date(lp.updatedAt).toLocaleDateString()}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-gray-300 mt-2">
                      <span>{lp.published}</span>
                      <span className="flex items-center gap-1">
                        ❤️ {lp.likes?.length ?? 0}
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </div>
        </>
    )
}

export default LpCard;