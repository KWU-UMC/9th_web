import { memo } from 'react';
import type { Movie } from '../types/movie';

interface MovieDetailProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetail = ({ movie, onClose }: MovieDetailProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
      {/* 포스터 영역 */}
      <div className="w-full md:w-2/5 h-64 md:h-auto relative flex-shrink-0">
         <img 
          src={posterUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover absolute inset-0"
        />
      </div>

      {/* 정보 영역 */}
      <div className="w-full md:w-3/5 p-6 flex flex-col overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800 break-keep">{movie.title}</h2>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  평점 {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-500 text-sm">
                  {movie.release_date}
              </span>
          </div>
          
          <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">줄거리</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                  {movie.overview || "제공된 줄거리가 없습니다."}
              </p>
          </div>
        </div>

        <div className="mt-auto flex space-x-3 pt-4">
           <a 
              href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded text-center transition-colors text-sm flex items-center justify-center"
           >
              IMDb
           </a>
           <button 
              onClick={onClose}
              className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded transition-colors text-sm"
           >
              닫기
           </button>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieDetail);