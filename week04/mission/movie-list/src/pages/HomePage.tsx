import { useEffect, useState } from 'react'
import type { Movie } from '../types/movie'
import Poster from '../components/Poster';
import PageButton from '../components/PageButton';
import LoadingSpinner from '../components/LoadingSpinner';
import useCustomFetch from '../hooks/useCustomFetch';

type HomePageProps = {
  nav: string;
};

const HomePage = ({nav}: HomePageProps) => {
  const {getMovies, isLoading, setIsLoading, isError, setIsError} = useCustomFetch();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  useEffect(():void => {
    const fetchMovies = async ():Promise<void> => {
      setIsLoading(true);
      try {
        const movies = await getMovies(nav, page);
        setMovies(movies);
      } catch{
        setIsError(true);
      } finally{
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [nav, page]);

  if (isError){
    return(
      <div>
        <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center mt-10 mb-10'>
      <div className='flex gap-3 mb-7 items-center'>
        <PageButton 
          isUp={false}
          page={page}
          onPage={setPage}
        />
        <span>{page} 페이지</span>
        <PageButton 
          isUp={true}
          page={page}
          onPage={setPage}
        />
      </div>

      {isLoading ? (
        <div className='flex items-center justify-center h-dvh'>
          <LoadingSpinner />
        </div>
      ) : (
        <ul className='grid grid-cols-5 gap-x-10 gap-y-5'>
        {movies.map((movie) => (
          <Poster key={movie.id} movie={movie}/>
        ))}
      </ul>
      )}
    </div>
  )
}

export default HomePage
