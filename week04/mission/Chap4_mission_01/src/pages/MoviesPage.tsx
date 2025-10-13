import { useParams } from "react-router-dom";
import { useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";

function MoviesPage() {
  // 페이지
  const [page, setPage] = useState(1);
  const { category } = useParams<{ category: string }>();

  const url = category? `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`: null;
  //console.log(url);
  const { data: movies, isLoading, isError } = useCustomFetch<MovieResponse, Movie[]>(url, 
    (res) => res.results,
    [url]
  );

  if (isError) {
    return <div className="text-red-500 text-2xl">에러가 발생했습니다.</div>;
  }

  return (
    <>
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          disabled={page === 1}
          className="bg-green-200 p-2 rounded-md text-white hover:bg-green-300 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
          onClick={(): void => setPage((prev): number => prev - 1)}
        >
          {`<`}
        </button>
        <span className="text-lg">{page} 페이지</span>
        <button
          className="bg-green-200 p-2 rounded-md text-white hover:bg-green-300 cursor-pointer disabled:cursor-not-allowed"
          onClick={(): void => setPage((prev): number => prev + 1)}
        >
          {`>`}
        </button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-dvh">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
          {movies?.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}

export default MoviesPage;
