import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
        {
          headers: {
            Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhM2M1NjNjNzYwMDc4MTcxNWU5ZDAzOTcwZDAwYmVhOSIsIm5iZiI6MTc1ODg1NjgxOS4zNTMsInN1YiI6IjY4ZDYwNjczOGVhYTBlNWI3YTY4YWRiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xh4mhCD4CsMbVVNbQtwtXGZUj_KXxyA1nXtX-Q1wAmw`, // 본인 TMDB 토큰으로 교체
          },
        }
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;