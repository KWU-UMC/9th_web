import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";

function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  console.log(movies);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 에러 상태
  const [isError, setIsError] = useState<boolean>(false);
  // 페이지
  const [page, setPage] = useState(1);
  const { category } = useParams<{ category: string }>();

  useEffect((): void => {
    const fetchMovies = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`, // 본인 TMDB 토큰으로 교체
            },
          }
        );
        setMovies(data.results);
        setIsLoading(false);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

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
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}

export default MoviesPage;
