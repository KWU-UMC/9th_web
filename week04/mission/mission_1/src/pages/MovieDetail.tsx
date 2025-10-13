import { useParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';

// 영화 상세 정보 타입 정의
interface MovieDetail {
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const MOVIE_DETAIL_URL = `https://api.themoviedb.org/3/movie/${id}`;

  const { data: movie, loading, error } = useCustomFetch<MovieDetail>(MOVIE_DETAIL_URL);

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
        <p>Error: {error.message}</p>
      </div>
    );
  }

  // movie가 아직 로드되지 않았을 경우 렌더링하지 않음
  if (!movie) return null;

  const backdropStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="min-h-screen text-white" style={backdropStyle}>
      <div className="container mx-auto p-8 flex flex-col md:flex-row items-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-64 rounded-lg shadow-2xl mb-8 md:mb-0 md:mr-12"
        />
        <div className="max-w-2xl">
          <h1 className="text-5xl font-extrabold mb-4">{movie.title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 text-2xl font-bold mr-4">⭐ {movie.vote_average.toFixed(1)}</span>
            <span className="text-gray-300">{movie.release_date}</span>
          </div>
          <div className="mb-6">
            {movie.genres.map(genre => (
              <span key={genre.id} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">{genre.name}</span>
            ))}
          </div>
          <h2 className="text-2xl font-semibold mb-2">Overview</h2>
          <p className="text-gray-200 leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}