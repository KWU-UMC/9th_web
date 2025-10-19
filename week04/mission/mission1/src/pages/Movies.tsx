import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";
import type { MovieResponse } from "../types/movie";

export default function MoviesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { category } = useParams<{ category: string }>();

  const getEndpoint = () => {
    switch (category) {
      case "popular":
        return "popular";
      case "showing":
        return "now_playing";
      case "rated":
        return "top_rated";
      case "coming":
        return "upcoming";
      default:
        return "popular";
    }
  };

  const endpoint = getEndpoint();
  const url = `https://api.themoviedb.org/3/movie/${endpoint}?language=ko-KR&page=${currentPage}`;

  const { data, isLoading, error } = useCustomFetch<MovieResponse>(url);
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 1;

  return (
    <div className="p-8">
      {/* 영화 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className={`px-6 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-700 text-gray-500"
              : "bg-pink-600 hover:bg-pink-700 text-white"
          }`}
        >
          이전
        </button>

        <span className="text-white">{currentPage}</span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage >= totalPages}
          className={`px-6 py-2 rounded-lg ${
            currentPage >= totalPages
              ? "bg-gray-700 text-gray-500"
              : "bg-pink-600 hover:bg-pink-700 text-white"
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
