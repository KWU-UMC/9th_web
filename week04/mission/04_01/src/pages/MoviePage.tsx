import { useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { Movie, MovieResponse } from "../types/movie";
import { useCustomFetch } from "../hooks/useCustomFetch";

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const { category } = useParams<{ category: string }>();

  const url =
    category
      ? `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`
      : null;

  const { data, isPending, error } = useCustomFetch<MovieResponse>(url, {
    deps: [page, category],
  });

  if (error) {
    return (
      <div className="min-h-[50vh] grid place-items-center">
        <div className="text-red-500 text-center">
          데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
          <div className="mt-2 text-xs opacity-70">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-200 disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          {`<`}
        </button>
        <span>{page}페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200"
          onClick={() => setPage((prev) => prev + 1)}
        >
          {`>`}
        </button>
      </div>

      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {(data?.results ?? []).map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} category={category!} />
          ))}
        </div>
      )}
    </>
  );
}
