import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Credit, Credits } from "../types/credit";
import ErrorPage from "./errorPage";
import CreditCard from "../components/CreditCard";
import type { Movie } from "../types/movies";

const DetailMovie = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [credits,setCredits]=useState<Credit[]>([]);
    const [movie, setMovie] = useState<Movie>();
    const [isLoading,setIsloading] =useState(true);
    const [isError,setIserror]=useState(false);
    const id = movieId?.trim();
    useEffect(() => {
        const loadCredits = async () => {
            setIsloading(true);
            try {
                const { data } = await axios.get<Credits>(
                    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );

                setCredits(data.cast);
            } catch (error) {
                setIserror(true);
            }

            try{
                const { data } = await axios.get<Movie>(
                    `https://api.themoviedb.org/3/movie/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );

                setMovie(data);
                setIsloading(false);
                setIserror(false);
            } catch(error) {
                setIserror(true);
            }
        };

        loadCredits();
    }, [id]);

    return (
        <>
            {isError &&(<ErrorPage />)}

            {!isLoading && (
                <div className="relative w-full h-[400px]">
                    <img src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50" />
                        <div className="relative z-10 flex flex-col justify-center h-full px-16 text-white">
                        <h1 className="text-3xl font-bold mb-4">{movie?.title}</h1>
                        <p className="text-base mb-3 max-w-3xl line-clamp-3">{movie?.overview}</p>
                        <p className="text-sm text-gray-200">개봉일: {movie?.release_data}</p>
                    </div>
                    <ul className="container mx-auto mt-8 px-16 py-4 grid grid-cols-5 gap-2">
                        {credits.slice(0, 10).map((m) => (
                            <CreditCard key={m.id} credit={m}/>
                        ))}
                    </ul>
                </div>
            )}
            
            {isLoading && (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black-500"></div>
                </div>
            )}
        </>
    )
}

export default DetailMovie;