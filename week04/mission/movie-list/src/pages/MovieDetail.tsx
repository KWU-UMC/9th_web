import { useParams } from 'react-router-dom'
import type { CastMember, TMovieCredits, TMovieDetails } from '../types/movie';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import CreditsCard from '../components/CreditsCard';
import DetailCard from '../components/DetailCard';
import useCustomFetch from '../hooks/useCustomFetch';

const MovieDetail = () => {
  const {getMovieDetails, isLoading, setIsLoading, isError, setIsError} = useCustomFetch();
  const params = useParams();
  const [details, setDetails] = useState<TMovieDetails | null>(null);
  const [credits, setCredits] = useState<TMovieCredits | null>(null);

  useEffect((): void => {
    const fetchDetails = async ():Promise<void> => {
      setIsLoading(true);
      try{
        const {detailsData, creditsData} = await getMovieDetails(params.movieId);

        setDetails(detailsData);
        setCredits(creditsData);
      } catch (error){
        setIsError(true)
        console.log(error);
      } finally{
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [params.movieId]);

  if (isLoading){ 
    return <div className='flex items-center justify-center h-dvh'><LoadingSpinner /></div>
  }

  if (isError){
    return(
      <div>
        <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <div className='m-10'>
      <DetailCard 
        title={details?.title}
        vote_average={details?.vote_average}
        released_year={details?.release_date.slice(0,4)}
        runtime={details?.runtime}
        overview={details?.overview}
        poster_path={details?.poster_path}
      />
      <hr />
      <div className='mt-5'>
        <h1 className='text-xl font-semibold mb-5'>감독/출연</h1>
        <ul className='grid grid-cols-5'>
          <CreditsCard
            profile_path={credits?.crew[0].profile_path}
            name={`${credits?.crew[0].name}(director)`}
            original_name={credits?.crew[0].original_name}
          />
          {credits?.cast.map((cast: CastMember) => (
            <CreditsCard
              key={cast.id}
              profile_path={cast.profile_path}
              name={cast.name}
              original_name={cast.original_name}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MovieDetail
