// src/components/MovieCard.tsx

import React from 'react';
import type { Movie } from '../types';
import { Link } from 'react-router-dom'; // 미션 3을 위해 Link 추가

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";

  return (
    // Link 컴포넌트로 감싸서 클릭 시 상세 페이지로 이동
    <Link to={`/movies/${movie.id}`}>
      <div className="relative group rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
        <img
          className="w-full h-full object-cover transition-all duration-300 group-hover:blur-sm group-hover:brightness-50"
          src={movie.poster_path ? `${baseImageUrl}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
          alt={movie.title}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = 'https://via.placeholder.com/500x750?text=No+Image';
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-xl font-bold">{movie.title}</h3>
          <p className="mt-2 text-sm max-h-24 overflow-hidden">
            {movie.overview ? movie.overview : "줄거리 정보가 없습니다."}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;