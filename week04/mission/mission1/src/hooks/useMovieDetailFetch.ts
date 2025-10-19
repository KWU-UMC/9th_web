import { useEffect, useState } from "react";
import type { MovieDetail } from "../types/movieDetail";
import axios from "axios";

export const useMovieDetailFetch = (movieId: string | undefined) => {
  const [movieData, setMovieData] = useState<MovieDetail | null>(null);

  useEffect(() => {
        const fetchMovieDetail = async (): Promise<void> => {
        const apiKey = import.meta.env.VITE_TMDB_KEY;
        const baseUrl = 'https://api.themoviedb.org/3/movie/';
      
        const [detailsRes, creditsRes, imagesRes] = await axios.all([
          axios.get(`${baseUrl}${movieId}?language=ko-KR`, { headers: { Authorization: `bearer ${apiKey}` } }),
          axios.get(`${baseUrl}${movieId}/credits?language=ko-KR`, { headers: { Authorization: `bearer ${apiKey}` } }),
          axios.get(`${baseUrl}${movieId}/images`, { headers: { Authorization: `bearer ${apiKey}` } }),
        ]);
        
        setMovieData({
          ...detailsRes.data,
          cast: creditsRes.data.cast,
          images: imagesRes.data.backdrops,
        });
    };
    if (movieId) {
            fetchMovieDetail();
        }

  }, [movieId]);

  return { movieData };
  
};