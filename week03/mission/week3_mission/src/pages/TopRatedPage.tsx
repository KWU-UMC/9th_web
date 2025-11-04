import MoviesByCategory from './MoviesByCategory';
export default function TopRatedPage() {
  return <MoviesByCategory endpoint="movie/top_rated" title="평점 높은" />;
}
