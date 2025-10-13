import { useParams } from "react-router-dom";
import type { Detail, DetailResponse } from "../types/detail";
import type { Cast, Crew, CreditResponse } from "../types/credit";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MovieDetailSection } from "../components/MovieDetailSection";
import useCustomFetch from "../hooks/useCustomFetch";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  // URL 설정
  const detailUrl =
    movieId
      ? `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
      : null;

  const creditUrl =
    movieId
      ? `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`
      : null;

  // 영화 상세정보
  const {
    data: detail,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useCustomFetch<DetailResponse, Detail>(detailUrl, (res) => res, [movieId]);

  // 출연진, 제작진
  const {
    data: credit,
    isLoading: isCreditLoading,
    isError: isCreditError,
  } = useCustomFetch<CreditResponse, { cast: Cast[]; crew: Crew[] }>(
    creditUrl,
    (res) => ({
      cast: res.cast.slice(0, 20),
      crew: res.crew.slice(0, 10),
    }),
    [movieId]
  );

  // 로딩, 에러 병합
  const isLoading = isDetailLoading || isCreditLoading;
  const isError = isDetailError || isCreditError;

  if (isError) {
    return <div className="text-red-500 text-2xl">에러가 발생했습니다.</div>;
  }

  return (
    <div>
      {isLoading && (
        <div className="flex justify-center items-center h-dvh">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && detail &&(
        <div className="flex flex-col mt-4">
          <MovieDetailSection detail={detail} />
          <div className="p-5 mx-5">
            <h2 className="text-2xl font-semibold mb-2">출연진</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-2">
              {credit?.cast.map((c) => (
                <div className="flex flex-col justify-center items-center">
                  <img
                    className="size-20 object-cover rounded-full"
                    src={
                      c.profile_path
                        ? `https://image.tmdb.org/t/p/w200${c.profile_path}`
                        : "https://via.placeholder.com/200x300"
                    }
                    alt={c.name}
                  />
                  <p className="font-bold mt-2">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.character}</p>
                </div>
              ))}
            </div>
          </div>
          {/* 제작진 정보 */}
          <div className="p-5 mx-5">
            <h2 className="text-2xl font-semibold mt-6 mb-2">제작진</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {credit?.crew.map((c) => (
                <div className="text-center">
                  <p className="font-bold mt-2">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.job}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;
