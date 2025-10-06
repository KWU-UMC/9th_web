import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Detail, DetailResponse } from "../types/detail";
import type { Cast, Crew, CreditResponse } from "../types/credit";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MovieDetailSection } from "../components/MovieDetailSection";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  // 영화 상세 정보
  const [detail, setDetail] = useState<Detail>({} as Detail);
  // 출연진 정보
  const [casts, setCast] = useState<Cast[]>([]);
  // 제작진 정보
  const [crews, setCrew] = useState<Crew[]>([]);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 에러 상태
  const [isError, setIsError] = useState<boolean>(false);

  useEffect((): void => {
    const fetchMovie = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const headers = {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
        };
        const [detailRes, creditRes] = await Promise.all([
          axios.get<DetailResponse>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            { headers }
          ),
          axios.get<CreditResponse>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            { headers }
          ),
        ]);
        setDetail(detailRes.data);
        setCast(creditRes.data.cast.slice(0, 20));
        setCrew(creditRes.data.crew.slice(0, 10));
        // console.log(detailRes.data);
        // console.log(creditRes.data);
        setIsLoading(false);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

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
      {!isLoading && (
        <div className="flex flex-col mt-4">
          <MovieDetailSection detail={detail} />
          <div className="p-5 mx-5">
            <h2 className="text-2xl font-semibold mb-2">출연진</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-2">
              {casts.map((c) => (
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
              {crews.map((c) => (
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
