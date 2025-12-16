import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  PencilSquareIcon,
  TrashIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import ErrorPage from "./errorPage";
import type { Lp, ResponseLpDetailDto } from "../types/lp";
import CommentsSection from "../components/LpComment/CommentsSection";

const fetchLpDetail = async (id: string): Promise<Lp> => {
  const { data } = await axios.get<ResponseLpDetailDto>(
    `http://localhost:8000/v1/lps/${id}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
      },
    }
  );

  return data.data;
};

function formatFromNow(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";

  const diffSec = (Date.now() - d.getTime()) / 1000;
  const diffDay = Math.floor(diffSec / 86400);

  if (diffDay <= 0) return "오늘";
  if (diffDay === 1) return "1일 전";
  return `${diffDay}일 전`;
}

const DetailLp = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const id = lpId?.trim() ?? "";

  const {
    data: lp,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["lp", id],
    queryFn: () => fetchLpDetail(id),
    enabled: !!id,
  });

  if (isPending) return <div>로딩…</div>;
  if (isError || !lp) return <ErrorPage />;

  return (
    <>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-sm font-bold">
              {lp.title.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-300">{lp.authorld}</span>
              <span className="text-xs text-gray-500">
                {formatFromNow(lp.updatedAt)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-black">
            <button
              type="button"
              className="p-2 rounded-full hover:bg-white/10 transition"
            >
              <PencilSquareIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 rounded-full hover:bg-white/10 transition"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <h1 className="mt-6 text-2xl md:text-3xl font-semibold">
          {lp.title}
        </h1>

        <div className="mt-8 flex justify-center">
          <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-auto rounded-2xl object-cover"
            />
        </div>

        <p className="mt-10 text-sm md:text-base leading-relaxed text-black text-center max-w-3xl mx-auto whitespace-pre-line">
          {lp.content}
        </p>

        {lp.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {lp.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 rounded-full bg-black text-xs text-gray-200"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center items-center gap-2 text-pink-400">
          <HeartIcon className="w-6 h-6" />
          <span className="text-sm">{lp.likes?.length ?? 0}</span>
        </div>

        <CommentsSection lpId={id} />
    </>
  );
};

export default DetailLp;
