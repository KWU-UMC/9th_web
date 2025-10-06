// src/pages/MovieDetailPage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import type { MovieDetail, CreditsApiResponse, CastMember, CrewMember } from '../types';

function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>(); // URL 파라미터에서 movieId 가져오기
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<CreditsApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const backdropImageUrl = "https://image.tmdb.org/t/p/original"; // 배경 이미지용

  useEffect(() => {
    if (!API_TOKEN) {
      setError("TMDB API 토큰이 설정되지 않았습니다. .env 파일을 확인해주세요.");
      setLoading(false);
      return;
    }

    if (!movieId) {
      setError("영화 ID가 제공되지 않았습니다.");
      setLoading(false);
      return;
    }

    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 영화 상세 정보 요청
        const detailResponse = await axios.get<MovieDetail>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          { headers: { Authorization: `Bearer ${API_TOKEN}`, accept: 'application/json' } }
        );
        setMovieDetail(detailResponse.data);
        console.log('영화 상세 정보:', detailResponse.data);

        // 출연진/제작진 정보 요청
        const creditsResponse = await axios.get<CreditsApiResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          { headers: { Authorization: `Bearer ${API_TOKEN}`, accept: 'application/json' } }
        );
        setCredits(creditsResponse.data);
        console.log('출연진/제작진 정보:', creditsResponse.data);

      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("영화 상세 정보 불러오기 실패:", err.response?.data || err.message);
          setError(`영화 상세 정보를 불러오는 데 실패했습니다: ${err.response?.data?.status_message || err.message}`);
        } else {
          console.error("알 수 없는 에러:", err);
          setError("알 수 없는 에러가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [API_TOKEN, movieId]); // movieId가 변경될 때마다 다시 호출

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-2xl">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        <span className="ml-4">영화 상세 정보 로딩 중...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-red-500 text-2xl p-4 text-center">
        오류 발생: {error}
      </div>
    );
  }

  if (!movieDetail) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-gray-400 text-2xl">
        영화 정보를 찾을 수 없습니다.
      </div>
    );
  }

  // 감독 정보 찾기
  const director = credits?.crew.find((member) => member.job === 'Director');
  // 주요 출연진 5명
  const mainCast = credits?.cast.slice(0, 5);

  return (
    <div className="text-white bg-gray-900">
      {/* 배경 이미지 */}
      {movieDetail.backdrop_path && (
        <div 
          className="relative h-96 bg-cover bg-center" 
          style={{ backgroundImage: `url(${backdropImageUrl}${movieDetail.backdrop_path})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>
      )}

      <div className="container mx-auto p-4 md:flex md:space-x-8 -mt-24 relative z-0">
        {/* 포스터 */}
        <div className="flex-shrink-0 mb-8 md:mb-0">
          <img
            src={movieDetail.poster_path ? `${baseImageUrl}${movieDetail.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
            alt={movieDetail.title}
            className="w-full md:w-64 rounded-lg shadow-xl"
          />
        </div>

        {/* 영화 정보 */}
        <div className="flex-grow">
          <h1 className="text-4xl font-bold mb-2">{movieDetail.title}</h1>
          {movieDetail.tagline && <p className="text-gray-400 italic mb-4">{movieDetail.tagline}</p>}
          
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-yellow-400 text-xl flex items-center">
              <span className="material-icons mr-1">⭐</span> {/* 별 아이콘 */}
              {movieDetail.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-400">({movieDetail.vote_count}명)</span>
            <span className="text-gray-400 text-sm">|</span>
            <span className="text-gray-300">{movieDetail.release_date}</span>
            {movieDetail.runtime && <span className="text-gray-300 text-sm">| {movieDetail.runtime}분</span>}
          </div>

          <p className="text-lg mb-6">{movieDetail.overview}</p>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <p className="font-semibold text-gray-300">장르:</p>
              <p>{movieDetail.genres.map((g) => g.name).join(', ')}</p>
            </div>
            {director && (
              <div>
                <p className="font-semibold text-gray-300">감독:</p>
                <p>{director.name}</p>
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-300">예산:</p>
              <p>{movieDetail.budget > 0 ? `$${movieDetail.budget.toLocaleString()}` : '정보 없음'}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-300">수익:</p>
              <p>{movieDetail.revenue > 0 ? `$${movieDetail.revenue.toLocaleString()}` : '정보 없음'}</p>
            </div>
          </div>

          {/* 출연진 */}
          {mainCast && mainCast.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">주요 출연진</h2>
              <div className="flex flex-wrap gap-4">
                {mainCast.map((actor) => (
                  <div key={actor.id} className="text-center w-24">
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

          {/* 제작진 (옵션) */}
          {credits?.crew && credits.crew.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">제작진</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
                {credits.crew.slice(0, 8).map((crewMember) => ( // 일부만 표시
                  <div key={crewMember.credit_id} className="bg-gray-800 p-3 rounded-md">
                    <p className="font-semibold">{crewMember.name}</p>
                    <p className="text-gray-400">{crewMember.job}</p>
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

export default MovieDetailPage;