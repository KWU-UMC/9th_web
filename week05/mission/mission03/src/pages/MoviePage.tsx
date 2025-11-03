import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import ErrorPage from "./errorPage";
import MovieCard from "../components/MovieCard";
import type { Movies } from "../types/movies";


const MoviePage = () => {
    const location = useLocation();
    const [pages, setPages]=useState<number>(1);

    const endpoint =
        location.pathname === "/playing" ? "now_playing" :
        location.pathname === "/top_rated" ? "top_rated" :
        location.pathname === "/upcoming" ? "upcoming" :
        "popular";

    const {data: movies, isLoading: loadCredit, isError: errorCredit }=useCustomFetch<Movies>(
            `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=${pages}`);


    useEffect(() => { setPages(1); }, [endpoint]);

    if(errorCredit) return (<ErrorPage />);
    if(loadCredit) return (
        <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black-500"></div>
        </div>
    );
    
    if (!movies) return null;
    return (
        <>
            <div className="">
                <div className="flex items-center justify-center gap-3 mb-5">
                    <button
                        onClick={() => setPages((p) => Math.max(1, p - 1))}
                        disabled={pages === 1}
                        className="px-3 py-1 rounded-lg bg-gray-200 disabled:opacity-50"
                    >
                    &lt;
                    </button>

                    <span className="px-4 py-1 rounded-lg text-block-900 font-semibold">
                        {pages}
                    </span>

                    <button
                        onClick={() => setPages((p) => p + 1)}
                        className="px-3 py-1 rounded-lg bg-gray-200"
                    >
                    &gt;
                    </button>
                </div>

                <ul className="container mx-auto px-16 py-4 grid grid-cols-6 gap-2">
                    {movies.results.map((m) => (
                        <MovieCard key={m.id} movie={m}/>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MoviePage;
