import type { Movie } from "../types/movie";

interface MovieDetailProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetail = ({ movie, onClose }: MovieDetailProps) => {
  // IMDb 검색 URL
  const imdbSearchUrl = `https://www.imdb.com/find?q=${encodeURIComponent(
    movie.title
  )}`;

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex items-start">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={`${movie.title}의 이미지`}
            className="rounded-lg shadow-md"
          />

          <div className="flex flex-col justify-items-end">
            <div className="flex-col gap-2 p-3">
              <div className="flex-col">
                <p className="text-lg font-bold">평점</p>
                <div className="flex gap-1 items-center ml-2">
                  <p className="font-bold text-blue-500">
                    {movie.vote_average}
                  </p>
                  <p className="text-gray-700">({movie.vote_count} 평가)</p>
                </div>
              </div>

              <div className="flex-col">
                <p className="text-lg font-bold">개봉일</p>
                <p className="font-bold text-neutral-800 ml-2">
                  {movie.release_date}
                </p>
              </div>

              <div className="flex-col">
                <p className="text-lg font-bold">인기도</p>
                <p className="text-sm font-bold text-neutral-800 ml-2">
                  {movie.popularity}
                </p>
              </div>

              <div className="flex-col">
                <label className="text-lg font-bold">줄거리</label>
                <div className="ml-2 max-h-36 overflow-y-auto">
                  <p className="text-sm font-bold text-neutral-800">
                    {movie.overview}
                  </p>
                </div>
              </div>

            </div>
            {/* 버튼 */}
            <div className="flex p-3 gap-4">
              <button
                className="bg-blue-500 p-2 rounded-md text-md text-white font-bold cursor-pointer"
                onClick={() => window.open(imdbSearchUrl, "_blank")}
              >
                IMDb에서 검색
              </button>
              <button
                className="bg-white border border-gray-300 p-2 rounded-md text-md 
                text-blue-500 font-bold cursor-pointer"
                onClick={onClose}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
