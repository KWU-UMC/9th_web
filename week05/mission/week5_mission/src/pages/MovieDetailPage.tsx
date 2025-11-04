import { useParams } from "react-router-dom";
import type { MovieDetail, Cast } from "../types/movie";
import { useTmdbFetch } from "../hooks/useTmdbFetch";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const PROFILE_BASE = "https://image.tmdb.org/t/p/w185";

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();

  // ✅ id가 없으면 잘못된 접근 처리
  if (!id) return <div className="p-6 text-red-600">잘못된 경로입니다. (id 누락)</div>;

  // ✅ TMDB 상세 + 영상 + 이미지 + 크레딧(출연/감독) 한 번에 요청
  const { data, loading, error, refetch } = useTmdbFetch<MovieDetail>(
    `/movie/${id}`,
    { language: "ko-KR", append_to_response: "videos,images,credits" }
  );

  if (loading) return <div className="p-6 text-gray-600">불러오는 중…</div>;
  if (error)
    return (
      <div className="p-6">
        <p className="text-red-600">{error}</p>
        <button
          onClick={refetch}
          className="mt-3 rounded-lg bg-black/80 px-3 py-2 text-white"
        >
          다시 시도
        </button>
      </div>
    );

  if (!data) return null;

  const directors =
    data.credits?.crew?.filter((c) => c.job === "Director") ?? [];
  const cast = data.credits?.cast ?? [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 text-white">
      {/* 🎞 영화 기본 정보 */}
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={data.poster_path ? `${IMG_BASE}${data.poster_path}` : "/placeholder.png"}
          alt={data.title}
          className="w-60 rounded-2xl shadow-lg mx-auto md:mx-0"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{data.title}</h1>
          {data.tagline && (
            <p className="mt-2 text-gray-400 italic">{data.tagline}</p>
          )}
          <div className="mt-4 text-sm text-gray-500 space-y-1">
            <p>개봉: {data.release_date}</p>
            <p>러닝타임: {data.runtime}분</p>
            <p>평점: ★ {data.vote_average?.toFixed(1)}</p>
            {directors.length > 0 && (
              <p>감독: {directors.map((d) => d.name).join(", ")}</p>
            )}
          </div>
          <p className="mt-6 leading-7 text-gray-400">
            {data.overview || "설명이 없습니다."}
          </p>
        </div>
      </div>

      {/* 🎭 출연 배우 목록 */}
      {cast.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-semibold">감독 / 출연</h2>

          <ul className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {cast
              .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
              .slice(0, 18) // 상위 18명만 표시
              .map((c: Cast) => {
                const img = c.profile_path
                  ? `${PROFILE_BASE}${c.profile_path}`
                  : "/avatar_placeholder.png";
                return (
                  <li
                    key={c.id}
                    className="text-center rounded-xl p-2 bg-black/5 "
                  >
                    <div className="mx-auto mb-2 h-24 w-24 overflow-hidden rounded-full ring-1 ring-white/10">
                      <img
                        src={img}
                        alt={c.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-sm font-medium truncate text-black">
                      {c.name}
                    </div>
                    <div className="text-xs text-black-400 truncate text-black">
                      {c.character || "voice"}
                    </div>
                  </li>
                );
              })}
          </ul>
        </section>
      )}
    </div>
  );
}
