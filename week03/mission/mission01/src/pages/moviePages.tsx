import { useEffect, useState } from "react";
import type { Movie, Movies } from "../types/movies"
import axios from "axios";
import MovieCard from "../components/MovieCard";

const MoviePage = () => {
    //1. api에서 가져온 데이터 저장할 useState 만들기
    const [movies,setMovies] = useState<Movie[]>([]);

    console.log(movies);

    //2. useEffect 사용해서 api로 값 저장하기
    useEffect (()=> {
        const loadPopularMovie = async () => {
            const { data } = await axios.get<Movies>(
                'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                }
            )

            setMovies(data.results);
        }

        loadPopularMovie();
    },[]);


     return (
        <ul className="container mx-auto px-16 py-4 grid grid-cols-6 gap-2">
            {movies.map((m) => (
                <MovieCard movie={m}/>
            ))}
        </ul>
    );
}

export default MoviePage;