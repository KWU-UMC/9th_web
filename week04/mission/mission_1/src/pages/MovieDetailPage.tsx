import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import type { MovieDetail, CreditsApiResponse, CastMember, CrewMember } from '../types';

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<CreditsApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const backdropImageUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    if (!movieId) return; // movieId가 없으면 아무것도 하지 않음

    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [detailResponse, creditsResponse] = await Promise.all([
          axios.get<MovieDetail>(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` }
          }),
          axios.get<CreditsApiResponse>(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` }
          })
        ]);
        setMovieDetail(detailResponse.data);
        setCredits(creditsResponse.data);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId, API_TOKEN]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)] text-white">
        로딩 중...
      </div>
    );
  }

  if (error || !movieDetail) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-64px)] text-red-500">
        <p className="text-2xl mb-4">{error || "영화 정보를 찾을 수 없습니다."}</p>
        <Link to="/" className="px-4 py-2 bg-blue-600 rounded-md text-white">홈으로</Link>
      </div>
    );
  }

  const director = credits?.crew?.find((member) => member.job === 'Director');
  const mainCast = credits?.cast?.slice(0, 10);

  return (
    <div className="text-white bg-gray-900 min-h-screen font-sans">
      {/* --- 👇 FIX #1: 데이터가 있을 때만 배경 렌더링 --- */}
      {movieDetail.backdrop_path && (
        <div 
          className="relative h-96 bg-cover bg-center" 
          style={{ backgroundImage: `url(${backdropImageUrl}${movieDetail.backdrop_path})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>
        </div>
      )}

      <div className="container mx-auto p-8 md:flex md:space-x-8 -mt-24 relative z-10">
        <div className="flex-shrink-0 mb-8 md:mb-0">
          <img
            src={movieDetail.poster_path ? `${baseImageUrl}${movieDetail.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
            alt={movieDetail.title}
            className="w-full md:w-64 rounded-lg shadow-xl"
          />
        </div>

        <div className="flex-grow">
          <h1 className="text-4xl font-bold mb-2">{movieDetail.title}</h1>
          {movieDetail.tagline && <p className="text-gray-400 italic mb-4">{movieDetail.tagline}</p>}
          
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-yellow-400 text-xl flex items-center">
              <span className="material-icons-outlined text-yellow-400 mr-1 text-2xl">star</span>
              {movieDetail.vote_average?.toFixed(1)}
            </span>
            <span className="text-gray-400 text-sm">({movieDetail.vote_count}명)</span>
            <span className="text-gray-400 text-sm">|</span>
            {/* --- 👇 FIX #2: 데이터가 있을 때만 날짜 렌더링 --- */}
            <span className="text-gray-300">{movieDetail.release_date?.substring(0,4)}</span>
            {movieDetail.runtime && <span className="text-gray-300 text-sm">| {movieDetail.runtime}분</span>}
          </div>

          <p className="text-lg mb-6 leading-relaxed">{movieDetail.overview}</p>

          {/* --- 👇 FIX #3: genres 배열이 있을 때만 렌더링 --- */}
          {movieDetail.genres && movieDetail.genres.length > 0 && (
            <div className="mb-6 text-sm">
              <p className="font-semibold text-gray-300">장르:</p>
              <p>{movieDetail.genres.map((g) => g.name).join(', ')}</p>
            </div>
          )}

          {director && (
            <div className="mb-6 text-sm">
              <p className="font-semibold text-gray-300">감독:</p>
              <p>{director.name}</p>
            </div>
          )}

          {/* --- 👇 FIX #4: mainCast 배열이 있을 때만 렌더링 --- */}
          {mainCast && mainCast.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">주요 출연진</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4">
                {mainCast.map((actor) => (
                  <div key={actor.id} className="text-center">
                    <img
                      src={actor.profile_path ? `${baseImageUrl}${actor.profile_path}` : 'https://via.placeholder.com/100x150?text=No+Photo'}
                      alt={actor.name}
                      className="w-24 h-24 object-cover rounded-full mx-auto mb-2 shadow-md"
                    />
                    <p className="text-sm font-semibold">{actor.name}</p>
                    <p className="text-xs text-gray-400">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}