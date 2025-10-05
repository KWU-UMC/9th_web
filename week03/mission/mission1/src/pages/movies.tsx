import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import MovieCard from "../components/movieCard";
const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`, // 본인 TMDB 토큰으로 교체
          },
        }
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-8  min-h-screen w-screen">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
