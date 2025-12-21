// src/pages/HomePage.tsx
import  { useState, useCallback, type FormEvent, useMemo } from 'react';
import { useCustomFetch } from '../hooks/useCustomFetch';
import type { Movie, MovieResponse } from '../types/movie';
import MovieFilter from '../components/MovieFilter';
import MovieCard from '../components/MovieCard';
import MovieDetailModal from '../components/MovieDetailModal';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  // 상태 관리
  const [query, setQuery] = useState('');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState('ko-KR');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // 커스텀 훅
  const { data, isLoading, fetchData } = useCustomFetch<MovieResponse>();

  const API_URL = import.meta.env.VITE_TMDB_API_URL;
  const ENDPOINT = query ? '/search/movie' : '/movie/popular';

  // [최적화 1] useCallback: 핸들러 함수가 매번 새로 생성되는 것을 방지
  const handleSearch = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const params = {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      query: query,
      include_adult: includeAdult,
      language: language,
      page: 1
    };
    await fetchData(`${API_URL}${ENDPOINT}`, params);
  }, [query, includeAdult, language, fetchData, API_URL, ENDPOINT]);

  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  // [최적화 2] useMemo: data가 변경될 때만 결과 메시지를 다시 계산
  // (input에 글자를 칠 때마다 이 변수가 재계산되는 것을 방지함)
  const searchResultMessage = useMemo(() => {
    if (!data) return null;
    if (data.results.length === 0) return '검색 결과가 없습니다.';
    return `총 ${data.total_results}개의 영화를 찾았습니다.`;
  }, [data]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 검색 필터 영역 (자식 컴포넌트가 memo 되어 있어도 props가 바뀌면 리렌더링 됨) */}
      <MovieFilter
        query={query}
        setQuery={setQuery}
        language={language}
        setLanguage={setLanguage}
        includeAdult={includeAdult}
        setIncludeAdult={setIncludeAdult}
        onSubmit={handleSearch}
      />

      {/* 검색 결과 메시지 출력 */}
      {searchResultMessage && (
        <p className="mb-4 text-gray-600 font-medium pl-1">
          {searchResultMessage}
        </p>
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* MovieCard는 memo 되어 있고, handleMovieClick은 useCallback 되어 있으므로 리렌더링 최소화 */}
          {data?.results.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={handleMovieClick} 
            />
          ))}
        </div>
      )}

      {selectedMovie && (
        <MovieDetailModal 
          movie={selectedMovie} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default HomePage;