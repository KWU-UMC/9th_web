import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/moviedetail/${movie.id}`);
  };

  return (
    <div key={movie.id} className="relative group cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full rounded-lg"
      />
      <div
        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 rounded-lg"
        onClick={handleClick}
      >
        <h3 className="text-white font-bold text-center">{movie.title}</h3>
        <p className="text-white text-sm text-center line-clamp-3">
          {movie.overview}
        </p>
      </div>
    </div>
  );
}
