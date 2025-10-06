import { useParams } from 'react-router-dom'
import type { CastMember, TMovieCredits, TMovieDetails } from '../types/movie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import CreditsCard from '../components/CreditsCard';
import DetailCard from '../components/DetailCard';

const tmdb_token = import.meta.env.VITE_TMDB_TOKEN;

const MovieDetail = () => {
  const params = useParams();
  const [details, setDetails] = useState<TMovieDetails | null>(null);
  const [credits, setCredits] = useState<TMovieCredits | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect((): void => {
    const fetchDetails = async ():Promise<void> => {
      setLoading(true);
      try{
        const {data: detailsData} = await axios.get<TMovieDetails>(
          `https://api.themoviedb.org/3/movie/${params.movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${tmdb_token}`
            },
          }
        );
        setDetails(detailsData);

        const {data: creditsData} = await axios.get<TMovieCredits>(
          `https://api.themoviedb.org/3/movie/${params.movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${tmdb_token}`,
            },
          }
        );
        creditsData.crew = creditsData.crew.filter(c => c.job === 'Director');
        creditsData.cast = creditsData.cast.slice(0, 14);
        setCredits(creditsData);
      } catch (error){
        console.log(error);
      } finally{
        setLoading(false);
      }
    };

    fetchDetails();
  }, [params.movieId]);

  if (loading){ 
    return <div className='flex items-center justify-center h-dvh'><LoadingSpinner /></div>
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
