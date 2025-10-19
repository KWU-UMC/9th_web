import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import MovieCard from "../components/movieCard";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/loadingSpinner";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const endpoint = getEndpoint();

        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${endpoint}?language=ko-KR&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          }
        );
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError("영화를 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [category, currentPage]);

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

  return (
    <div className="p-8">
      {/* 영화 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className={`px-6 py-2 rounded-lg transition-colors ${
            currentPage === 1
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white"
          }`}
        >
          이전
        </button>

        <span className="text-black font-semibold">{currentPage}</span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage >= totalPages}
          className={`px-6 py-2 rounded-lg transition-colors ${
            currentPage >= totalPages
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white "
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;
