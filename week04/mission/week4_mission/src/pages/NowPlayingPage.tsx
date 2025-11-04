import MoviesByCategory from './MoviesByCategory';
export default function NowPlayingPage() {
  return <MoviesByCategory endpoint="movie/now_playing" title="상영 중" />;
}
