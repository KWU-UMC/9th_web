import { useNavigate } from 'react-router-dom';
import type { Movie} from '../types/movies'
import { useState } from 'react';

interface MovieCardProps {
    movie : Movie;
}

export default function MovieCard({movie} : MovieCardProps): Element {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    
    return (
        <div
            onClick={(): void | Promise<void> => navigate(`/movie/${movie.id}`)}
            className="relative rounded-xl shadow-lg overflow-hidden curor-pointer
            w-44 transition-transform duration-500 hover:scale-105"
            onMouseEnter={(): void=>setIsHovered(true)}
            onMouseLeave={(): void=>setIsHovered(false)}>
            <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} 영화의 이미지`}
            className=''>
            </img>
            {isHovered && (
                <div className='absolute inset-0 bg-gradient-to-t from-black/50
                to-transparent backdrop-blur-md flex flex-col justify-center
                item-center text-white p-4'>
                    <h2 className='text-lg font-bold leading-snug'>{movie.title}</h2>
                    <h3 className='text-sm text-gray-300 leading-relaxed mt-2
                    line-clamp-5'>{movie.overview}</h3>
                </div>
            )}
        </div>
    );
};