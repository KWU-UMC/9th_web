import { useState } from "react";
import type { Movie } from "../types/movies";
import { useLocation, useNavigate } from "react-router-dom";

interface MovieCardProps {
    movie : Movie;
}

const MovieCard = ({movie} : MovieCardProps) => {
    const [isHover, setIshover] = useState(false);
    
    const navigate = useNavigate();
    const location=useLocation();
    const basePath = location.pathname.split("/")[1] || "popular";

    const handleClick = () => {
        navigate(`/${basePath}/${movie.id}`);
    };

    return (
        <>
            <li className="relative group cursor-pointer rounded-xl shadow-lg w-44 transition-transform duration-500 hover:scale-105" key={movie.id} onMouseEnter={():void => setIshover(true)} onMouseLeave={():void=>setIshover(false)} onClick={handleClick}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="rounded-xl"/>
                {isHover && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md flex flex-col items-center justify-center p-4">
                        <h2 className='text-lg font-bold text-center mt-1 text-white'>{movie.title}</h2>
                        <p className='text-xs mt-1 line-clamp-5 text-gray-300'>{movie.overview}</p>
                    </div>
                )} 
            </li>
        </>
    )
}

export default MovieCard;