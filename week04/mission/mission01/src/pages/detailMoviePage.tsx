import { useParams } from "react-router-dom";
import type { Credits } from "../types/credit";
import ErrorPage from "./errorPage";
import CreditCard from "../components/CreditCard";
import type { Movie } from "../types/movies";
import useCustomFetch from "../hooks/useCustomFetch";

const DetailMovie = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const id = movieId?.trim();
    
    const {data: credits, isLoading: loadCredits, isError: errorCredits }=useCustomFetch<Credits>(
            `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`);


    const {data : movie, isLoading: loadMovie, isError: errorMovie }=useCustomFetch<Movie>(
            `https://api.themoviedb.org/3/movie/${id}`);
    
    if (errorCredits || errorMovie) return <ErrorPage />;
    
    if(loadCredits||loadMovie)
    {
        return(
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black-500"></div>
            </div>
        )
    }
    return (
        <>
            <div className="relative w-full h-[400px]">
                <img src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50" />
                    <div className="relative z-10 flex flex-col justify-center h-full px-16 text-white">
                    <h1 className="text-3xl font-bold mb-4">{movie?.title}</h1>
                    <p className="text-base mb-3 max-w-3xl line-clamp-3">{movie?.overview}</p>
                    <p className="text-sm text-gray-200">개봉일: {movie?.release_date}</p>
                </div>
                <ul className="container mx-auto mt-8 px-16 py-4 grid grid-cols-5 gap-2">
                    {credits?.cast.slice(0, 10).map((m) => (
                        <CreditCard key={m.id} credit={m}/>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default DetailMovie;