import { memo } from "react";
import type { Movie } from "../types/movie";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div
      onClick={() => onClick(movie)}
      className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      {movie.poster_path ? (
        <img
          src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-80 object-cover"
        />
      ) : (
        <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No Image</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 truncate">{movie.title}</h3>
        <div className="flex justify-between text-sm text-gray-600">
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
          <span>{movie.release_date}</span>
        </div>
      </div>
    </div>
  );
}

//요기
export default memo(MovieCard);
