import axios from 'axios';
import type { TMovieDetails, MovieResponse, TMovieCredits } from "../types/movie";
import { useState } from 'react';


const tmdb_token = import.meta.env.VITE_TMDB_TOKEN;

const useCustomFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getMovies = async (nav: string, page: number) => {
    const {data} = await axios.get<MovieResponse>(
      `https://api.themoviedb.org/3/movie/${nav}?language=ko-KR&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${tmdb_token}`
        },
      }
    );
    return data.results;
  }

  const getMovieDetails = async (movieId: string | undefined) => {
    const {data: detailsData} = await axios.get<TMovieDetails>(
      `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
      {
        headers: {
          Authorization: `Bearer ${tmdb_token}`
        },
      }
    )

    const {data: creditsData} = await axios.get<TMovieCredits>(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
      {
        headers: {
          Authorization: `Bearer ${tmdb_token}`,
        },
      }
    );
    creditsData.crew = creditsData.crew.filter(c => c.job === 'Director');
    creditsData.cast = creditsData.cast.slice(0, 14);

    return {detailsData, creditsData};
  }

  return {getMovies, getMovieDetails, isLoading, setIsLoading, isError, setIsError}
}

export default useCustomFetch