import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getLpDetail } from "../apis/lps";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorState from "../components/ErrorState";

export default function LpDetailPage() {
  const { lpid } = useParams<{ lpid: string }>();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["lp", lpid],
    queryFn: () => getLpDetail(lpid!),
    enabled: !!lpid,
  });

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorState onRetry={refetch} />;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 썸네일 */}
        <div className="mb-8 overflow-hidden rounded-2xl">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full h-[500px] object-cover"
          />
        </div>

        {/* 메타 정보 */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-6">
          <h1 className="text-5xl font-bold text-white mb-6">{data.title}</h1>

          <div className="flex gap-8 text-gray-400 text-lg mb-6">
            <span className="flex items-center gap-2">
              📅 {new Date(data.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-black">🖤</span> {data.likes.length}
            </span>
          </div>

          {/* 태그 */}
          <div className="flex gap-2 flex-wrap">
            {data.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-4 py-2 bg-pink-600 text-white rounded-full text-sm"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>

        {/* 본문 */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-6">
          <div
            className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>

        {/* 버튼 */}
        <div className="flex gap-4">
          <button className="flex-1 px-6 py-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all">
            수정
          </button>
          <button className="flex-1 px-6 py-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all">
            삭제
          </button>
          <button className="flex-1 px-6 py-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all">
            🖤 좋아요
          </button>
        </div>
      </div>
    </div>
  );
}
