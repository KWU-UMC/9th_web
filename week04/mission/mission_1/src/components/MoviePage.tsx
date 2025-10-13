// src/components/MoviePage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import type { Movie, MovieApiResponse } from '../types';

function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1); // 페이지네이션을 위한 상태 추가

  // Vite 환경에서는 `import.meta.env.VITE_` 접두사를 사용해야 합니다.
  const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

  useEffect(() => {
    // API 토큰이 설정되지 않았으면 함수를 중단합니다.
    if (!API_TOKEN) {
      setError("TMDB API 토큰이 설정되지 않았습니다. .env 파일을 확인해주세요.");
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true); // 로딩 시작
      setError(null);   // 이전 에러 초기화

      try {
        const response = await axios.get<MovieApiResponse>(
          `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`, // page 상태 사용
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              accept: 'application/json',
            },
          }
        );

        console.log(`${page}페이지 데이터:`, response.data.results);
        setMovies(response.data.results);

      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("API 요청 실패:", err.response?.data || err.message);
          setError(`API 요청 실패: ${err.response?.data?.status_message || err.message}`);
        } else {
          console.error("알 수 없는 에러:", err);
          setError("알 수 없는 에러가 발생했습니다.");
        }
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchMovies();
  }, [API_TOKEN, page]); // page가 변경될 때마다 API를 다시 호출

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1)); // 1페이지 미만으로 내려가지 않도록
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-2xl">
        로딩 중... 🎬
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

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white text-center mb-8">인기 영화 (페이지: {page})</h1>
      
      {/* 영화 목록 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* 페이지네이션 버튼 */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-500"
        >
          이전 페이지
        </button>
        <span className="text-white text-lg font-bold">{page}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          다음 페이지
        </button>
      </div>
    </div>
  );
}

export default MoviePage;