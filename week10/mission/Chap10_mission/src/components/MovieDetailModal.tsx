import MovieDetail from "./MovieDetail";
import type { Movie } from "../types/movie";

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetailModal = ({ movie, onClose }: MovieDetailModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-md max-w-3xl w-full h-[80vh] relative overflow-hidden flex flex-col">
        {/* 백드롭*/}
        <div className="relative flex-2 w-full">
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={`${movie.title}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* 어두운 그라데이션 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
          {/* 제목 영역 */}
          <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
            <h2 className="text-2xl font-extrabold">{movie.title}</h2>
            <p className="text-sm opacity-80">{movie.original_title}</p>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-gray-300 hover:text-gray-100 text-xl font-extrabold z-10"
        >
          ✕
        </button>

        {/* 영화 상세 정보 */}
        <div className="flex-3 p-2">
          <MovieDetail onClose={onClose} movie={movie} />
        </div>

      </div>
    </div>
  );
};

export default MovieDetailModal;