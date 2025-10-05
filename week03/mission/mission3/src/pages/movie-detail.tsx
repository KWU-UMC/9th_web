import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/loadingSpinner";
import type { MovieDetails, Credits } from "../types/movie";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 영화 상세 정보
        const movieResponse = await axios.get<MovieDetails>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          }
        );

        // 출연진 정보
        const creditsResponse = await axios.get<Credits>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          }
        );

        setMovie(movieResponse.data);
        setCredits(creditsResponse.data);
      } catch (err) {
        setError("영화 정보를 불러올 수 없습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (isLoading) return <LoadingSpinner />;

  if (error || !movie) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  const mainCast = credits?.cast.slice(0, 10) || [];

  return (
    <div className="min-h-screen  text-white">
      <div>
        <div className="flex gap-8">
          {/* 포스터 */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-80 rounded-lg"
          />

          {/* 영화 정보 */}
          <div>
            <div className="flex flex-col gap-4 mb-4">
              <h3 className="text-white text-4xl font-bold">{movie.title}</h3>
              <div className="flex gap-2">
                <span className="text-yellow-400 text-2xl">별점</span>
                <span className="text-2xl font-bold">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <p className="text-gray-300">{movie.release_date}</p>
              <p className="text-gray-300">{movie.runtime}분</p>
            </div>

            <p className="text-gray-300 mb-6">
              {movie.overview || "줄거리 정보가 없습니다."}
            </p>
          </div>
        </div>

        {/* 출연진 */}
        {mainCast.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">감독/출연</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {mainCast.map((actor) => (
                <div key={actor.id} className="text-center">
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt={actor.name}
                      className="w-full rounded-lg mb-3"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">이미지 없음</span>
                    </div>
                  )}
                  <h3 className="font-semibold">{actor.name}</h3>
                  <p className="text-sm text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
