// src/pages/MoviesPage.tsx
import { Link } from "react-router-dom";
import type { MovieResponse } from "../types/movie";
import { useTmdbFetch } from "../hooks/useTmdbFetch";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function MoviesPage() {
  const { data, loading, error, refetch } = useTmdbFetch<MovieResponse>(
    "/discover/movie",
    {
      include_adult: false,
      include_video: false,
      language: "ko-KR",
      page: 1,
      sort_by: "popularity.desc",
    },
    [] // 의존성: page, sort 같은 걸 state로 빼면 여기에 넣어주면 됨
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

  const movies = data?.results ?? [];

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">
      <h1 className="mb-6 text-3xl font-bold">인기 영화</h1>

      <ul className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((m) => {
          const img = m.poster_path ? `${IMG_BASE}${m.poster_path}` : "/placeholder.png";
          return (
            <li
              key={m.id}
              className="group relative overflow-hidden rounded-3xl bg-white/5 shadow-lg ring-1 ring-black/5 transition duration-300 hover:shadow-2xl"
            >
              <Link to={`/movies/${m.id}`}>
                <div className="relative aspect-[2/3]">
                  <img
                    src={img}
                    alt={m.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:blur-sm"
                  />

                  <div
                    className="pointer-events-none absolute inset-0 flex flex-col justify-end p-4
                               bg-gradient-to-t from-black/70 via-black/30 to-transparent
                               opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <h3 className="text-white text-base font-semibold">{m.title}</h3>
                    <p className="mt-1 text-xs text-gray-200 line-clamp-2">
                      {m.overview || "설명이 없습니다."}
                    </p>
                    <div className="mt-2 text-[11px] text-gray-300">
                      개봉: {m.release_date || "-"} · 평점: {m.vote_average?.toFixed(1) ?? "-"}
                    </div>
                  </div>

                  <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[11px] text-white backdrop-blur-sm">
                    ★ {m.vote_average?.toFixed(1) ?? "-"}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
