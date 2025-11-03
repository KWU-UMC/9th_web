import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLps } from "../apis/lps";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorState from "../components/ErrorState";

export default function Home() {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["lps", order],
    queryFn: () => getLps({ order, limit: 10 }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorState onRetry={refetch} />;
  if (!data || !data.data) return null;

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">LP 목록</h1>
        <button
          onClick={() => setOrder(order === "desc" ? "asc" : "desc")}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          {order === "desc" ? "최신순 ▼" : "오래된순 ▲"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.data.map((lp) => (
          <div
            key={lp.id}
            onClick={() => navigate(`/lp/${lp.id}`)}
            className="group relative overflow-hidden rounded-xl cursor-pointer shadow-xl 
                       transition-all duration-300 ease-out
                       hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
          >
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-64 object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div
                className="absolute bottom-0 left-0 right-0 p-6 text-white 
                           transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              >
                <h3 className="text-xl font-bold mb-2">{lp.title}</h3>
                <p className="text-sm text-gray-300 mb-1">
                  {new Date(lp.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm flex items-center gap-1">
                  <span>🖤</span>
                  <span>{lp.likes.length}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
