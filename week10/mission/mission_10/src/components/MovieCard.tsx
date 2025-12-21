import { memo } from 'react';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={() => onClick(movie)}
    >
      <img 
        src={posterUrl} 
        alt={movie.title} 
        className="w-full h-[300px] object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{movie.title}</h3>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>⭐️ {movie.vote_average.toFixed(1)}</span>
          <span>{movie.release_date}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieCard);