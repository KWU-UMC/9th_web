import { Link } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';

// TMDB API 응답 타입 정의 (필요한 데이터만)
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface ApiResponse {
  results: Movie[];
}

const POPULAR_MOVIES_URL = 'https://api.themoviedb.org/3/movie/popular';

export default function Movies() {
  const { data, loading, error } = useCustomFetch<ApiResponse>(POPULAR_MOVIES_URL);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-red-500">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-white text-center mb-12">Popular Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {data?.results.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto" />
            <div className="p-4">
              <h2 className="text-white font-bold text-lg truncate">{movie.title}</h2>
              <p className="text-yellow-400 mt-1">⭐ {movie.vote_average.toFixed(1)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}