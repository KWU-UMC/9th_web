import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { Movie, Movies } from "../types/movies";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import ErrorPage from "./errorPage";

const MoviePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const location = useLocation();
    const [isLoading,setIsloading] =useState(true);
    const [isError,setIserror]=useState(false);
    const [pages, setPages]=useState<number>(1);

    const endpoint =
        location.pathname === "/playing" ? "now_playing" :
        location.pathname === "/top_rated" ? "top_rated" :
        location.pathname === "/upcoming" ? "upcoming" :
        "popular";
    useEffect(() => {
        const loadMovies = async () => {
            setIsloading(true);
            try {
                const { data } = await axios.get<Movies>(
                    `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=${pages}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );

                setMovies(data.results);
                setIsloading(false);
                setIserror(false);
            } catch (error) {
                setIserror(true);
            }
        };

        loadMovies();
    }, [endpoint,pages]);

    useEffect(() => { setPages(1); }, [endpoint]);

    return (
        <>
            {isError &&(<ErrorPage />)}

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

                {!isLoading && (
                    <ul className="container mx-auto px-16 py-4 grid grid-cols-6 gap-2">
                        {movies.map((m) => (
                            <MovieCard key={m.id} movie={m}/>
                        ))}
                    </ul>
                )}
                
                {isLoading && (
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black-500"></div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MoviePage;
