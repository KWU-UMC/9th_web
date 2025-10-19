import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";

const useCustomFetch = (category: string | undefined, page: number)=>{
    const [movies,setMovies] = useState<Movie[]>([]); 
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(()=>{
        const fetchMovies = async () => {
            try{
                const {data} = await axios.get<MovieResponse>(`https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`, {
                    headers: {
                        Authorization : `bearer ${import.meta.env.VITE_TMDB_KEY}`
                    }
                });
                setMovies(data.results);
            }catch{
                setIsError(true)
            }finally{
                
                setIsPending(false);
            }
        }
        fetchMovies();
        
    }, [category, page])
    return { movies, isPending, isError };
}

export default useCustomFetch;