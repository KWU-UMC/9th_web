import MoviesByCategory from './MoviesByCategory';
export default function PopularPage() {
  return <MoviesByCategory endpoint="movie/popular" title="인기 영화" />;
}
