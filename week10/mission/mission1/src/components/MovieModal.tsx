import type { Movie } from "../types/movie";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const handleImdbSearch = () => {
    window.open(
      `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`,
      "_blank"
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {movie.poster_path && (
          <img
            src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-96 object-cover"
          />
        )}
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold">평점:</span>
              <span>⭐ {movie.vote_average.toFixed(1)} / 10</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">개봉일:</span>
              <span>{movie.release_date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">성인:</span>
              <span>{movie.adult ? "🔞" : "전체 관람가"}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">줄거리</h3>
            <p className="text-gray-700 leading-relaxed">
              {movie.overview || "줄거리 정보가 없습니다."}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleImdbSearch}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              IMDb에서 검색하기
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
