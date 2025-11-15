// src/pages/movies.tsx
import { useEffect, useState } from 'react'
import type { Movie, MovieResponse } from '../types/movie'
import axios from 'axios'

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [hoveredMovieId, setHoveredMovieId] = useState<number | null>(null)

  console.log(movies)

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjY5MWFhOWUzMGI0NWNlYWU4ZjdiNjk1ZDZhNmVkMyIsIm5iZiI6MTc2MDc4NDQzMS42NTIsInN1YiI6IjY4ZjM3MDJmZmZjN2IwNDNjYzM5MTU2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NCL0ywR8drEr_AWyCHv7vP0pgr-bgc2WZ0IyfdwXYcY`,
          },
        },
      )
      setMovies(data.results)
    }
    fetchMovies()
  }, [])

  return (
    <ul className='grid grid-cols-6 gap-2 p-4 max-w-270 mx-auto'>
      {movies.map((movie) => (
        <li
          key={movie.id}
          className='relative cursor-pointer overflow-hidden rounded-xl'
          onMouseEnter={() => setHoveredMovieId(movie.id)}
          onMouseLeave={() => setHoveredMovieId(null)}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className={`w-full rounded-xl transition-all ${
              hoveredMovieId === movie.id ? 'blur-xs' : ''
            }`}
          />

          {hoveredMovieId === movie.id && (
            <div className='absolute inset-0 flex flex-col justify-center items-center p-4 text-white text-center rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100'>
              <h3 className='text-lg font-bold mb-2'>{movie.title}</h3>
              <p className='text-sm line-clamp-4'>{movie.overview}</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default MoviesPage
