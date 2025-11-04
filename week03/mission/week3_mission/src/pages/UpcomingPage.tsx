import MoviesByCategory from './MoviesByCategory';
export default function UpcomingPage() {
  return <MoviesByCategory endpoint="movie/upcoming" title="개봉 예정" />;
}
