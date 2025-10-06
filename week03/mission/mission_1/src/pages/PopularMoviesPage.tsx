// src/pages/PopularMoviesPage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import type { Movie, MovieApiResponse } from '../types';
import { useSearchParams } from 'react-router-dom'; // URL 쿼리 파라미터 관리를 위해 추가

function PopularMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1); // 총 페이지 수 상태
  
  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 파라미터 훅
  const currentPage = parseInt(searchParams.get('page') || '1'); // URL에서 현재 페이지 가져오기

  const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

  useEffect(() => {
    if (!API_TOKEN) {
      setError("TMDB API 토큰이 설정되지 않았습니다. .env 파일을 확인해주세요.");
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<MovieApiResponse>(
          `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              accept: 'application/json',
            },
          }
        );

        console.log(`인기 영화 ${currentPage}페이지 데이터:`, response.data.results);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages); // 총 페이지 수 업데이트

      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("API 요청 실패:", err.response?.data || err.message);
          setError(`API 요청 실패: ${err.response?.data?.status_message || err.message}`);
        } else {
          console.error("알 수 없는 에러:", err);
          setError("알 수 없는 에러가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [API_TOKEN, currentPage]); // API_TOKEN과 currentPage가 변경될 때마다 API 다시 호출

  const handlePageChange = (newPage: number) => {
    // 페이지가 유효한 범위 내에 있는지 확인
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage.toString() }); // URL 쿼리 파라미터 업데이트
      window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 상단으로 스크롤
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-2xl">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <span className="ml-4">영화 목록 로딩 중...</span>
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
      <h1 className="text-3xl font-bold text-white text-center mb-8">인기 영화 (현재 페이지: {currentPage})</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          이전 페이지
        </button>
        <span className="text-white text-lg font-bold">{currentPage} / {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages} // 마지막 페이지에서는 다음 페이지 버튼 비활성화
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          다음 페이지
        </button>
      </div>
    </div>
  );
}

export default PopularMoviesPage;