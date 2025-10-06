import type { Movie } from '../types/movie'

type PosterProps ={
  movie: Movie
}

const Poster = ({movie}: PosterProps) => {
  return (
    <li className='group relative overflow-hidden rounded-xl shadow-xl'>
      <img 
        src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
        alt={movie.title}
        className='rounded-xl block w-full h-auto object-cover group-hover:blur-[7px]'
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100'>
        <h3 className='text-white text-lg font-semibold'>
          {movie.title}
        </h3>
        <p className='text-white'>
          {movie.overview.length > 50
            ? movie.overview.slice(0,50) + '...'
            : movie.overview}
        </p>
      </div>
    </li>
  )
}

export default Poster
