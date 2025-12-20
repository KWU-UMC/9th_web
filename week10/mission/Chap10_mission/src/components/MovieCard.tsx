import type { ReactNode } from "react";
import type { Movie } from "../types/movie";
import { useState } from "react";
interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps): ReactNode => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative hover:scale-105 transition-transform"
      onMouseEnter={(): void => setIsHovered(true)}
      onMouseLeave={(): void => setIsHovered(false)}
      onClick={onClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`${movie.title}의 이미지`}
        className="w-full h-full object-cover rounded-lg shadow-md"
      />
      {isHovered && (
        <div className="flex flex-col text-white p-2">
          <div className="absolute inset-0 bg-gradient-to-t from-black-50 to-transparent backdrop-blur-md text-sm font-bold rounded-lg p-2 justify-center items-center ">
            <p className="text-sm line-clamp-4">{movie.overview}</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-opacity-75 bg-black p-2 rounded-b-lg">
            <h3 className="text-sm font-bold">{movie.title}</h3>
            <p className="text-xs">평점: {movie.vote_average}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;