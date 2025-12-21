import { useCallback, useState } from "react";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";
import type { Movie, SearchParams } from "./types/movie";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export default function MovieSearchApp() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    includeAdult: false,
    language: "ko-KR",
  });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchMovies = async (params: SearchParams) => {
    if (!params.query.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/search/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&query=${encodeURIComponent(params.query)}&include_adult=${
          params.includeAdult
        }&language=${params.language}`
      );
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("영화 검색 실패:", error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchMovies(searchParams);
  };

  //요기
  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">🎬 영화 검색</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                영화 제목
              </label>
              <input
                type="text"
                value={searchParams.query}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, query: e.target.value })
                }
                placeholder="영화 제목을 입력하세요"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">언어</label>
              <select
                value={searchParams.language}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, language: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ko-KR">한국어</option>
                <option value="en-US">영어</option>
                <option value="ja-JP">일본어</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="includeAdult"
              checked={searchParams.includeAdult}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  includeAdult: e.target.checked,
                })
              }
              className="w-4 h-4"
            />
            <label htmlFor="includeAdult" className="text-sm font-medium">
              성인 콘텐츠 포함
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {isLoading ? "검색 중..." : "🔍 검색"}
          </button>
        </form>

        {movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={handleMovieClick}
              />
            ))}
          </div>
        )}

        {!isLoading && movies.length === 0 && searchParams.query && (
          <div className="text-center text-gray-500 py-12">
            검색 결과가 없습니다.
          </div>
        )}

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}
