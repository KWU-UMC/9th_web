import { Link, useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { Credits, MovieDetails } from "../types/movie";
import { useCustomFetch } from "../hooks/useCustomFetch";

const IMG = (path?: string | null, size: "w185"|"w342"|"w500"|"original"="w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const detailUrl = movieId
    ? `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
    : null;

  const creditsUrl = movieId
    ? `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`
    : null;

  const {
    data: detail,
    isPending: pendingDetail,
    error: errorDetail,
  } = useCustomFetch<MovieDetails>(detailUrl, { deps: [movieId] });

  const {
    data: credits,
    isPending: pendingCredits,
    error: errorCredits,
  } = useCustomFetch<Credits>(creditsUrl, { deps: [movieId] });

  const isPending = pendingDetail || pendingCredits;
  const error = errorDetail || errorCredits;

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-red-500">
        데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
        <div className="mt-2 text-xs opacity-70">{error}</div>
      </div>
    );
  }

  if (!detail) {
    return <div className="p-6">영화 정보를 찾을 수 없습니다.</div>;
  }

  const directors = (credits?.crew ?? []).filter((p) => p.job === "Director");

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* 상단 백드롭 */}
      <div
        className="relative h-[40vh] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${IMG(detail.backdrop_path, "original")})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-black/40" />
        <div className="absolute bottom-4 left-4 flex items-end gap-4">
          <img
            src={IMG(detail.poster_path, "w342")}
            alt={detail.title}
            className="hidden sm:block w-36 rounded-xl shadow-2xl"
          />
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">{detail.title}</h1>
            <p className="mt-1 text-sm opacity-80">
              {detail.release_date?.slice(0, 4)} · {detail.runtime ?? "?"}분 · ⭐{" "}
              {detail.vote_average.toFixed(1)}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {detail.genres.map((g) => (
                <span key={g.id} className="rounded-full bg-white/10 px-3 py-1 text-xs">
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <section className="grid gap-6 md:grid-cols-[auto,1fr]">
          <img
            src={IMG(detail.poster_path, "w500")}
            alt={detail.title}
            className="w-48 md:w-56 rounded-xl shadow-xl md:hidden"
          />
          <div>
            <h2 className="text-xl font-semibold mb-2">줄거리</h2>
            <p className="text-sm leading-6 opacity-90">
              {detail.overview || "제공된 줄거리가 없습니다."}
            </p>

            {directors.length > 0 && (
              <>
                <h3 className="mt-6 text-lg font-semibold">감독</h3>
                <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                  {directors.map((d) => (
                    <div key={d.id} className="flex items-center gap-3 rounded-full bg-white/10 px-3 py-2">
                      <img src={IMG(d.profile_path, "w185")} alt={d.name} className="h-8 w-8 rounded-full object-cover" />
                      <div className="text-sm">
                        <p className="font-medium leading-tight">{d.name}</p>
                        <p className="text-xs opacity-70 leading-tight">{d.job}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">출연</h2>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {(credits?.cast ?? [])
              .sort((a, b) => a.order - b.order)
              .slice(0, 18)
              .map((c) => (
                <div key={c.id} className="rounded-xl bg-white/5 p-3 hover:bg-white/10 transition">
                  <img
                    src={IMG(c.profile_path, "w342")}
                    alt={c.name}
                    className="aspect-[2/3] w-full rounded-lg object-cover"
                  />
                  <p className="mt-2 text-sm font-medium leading-tight">{c.name}</p>
                  <p className="text-xs opacity-70 leading-tight">{c.character}</p>
                </div>
              ))}
          </div>
        </section>

        <div className="mt-10">
          <Link to="/" className="text-sm opacity-80 hover:opacity-100 underline">
            ← 목록으로
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
