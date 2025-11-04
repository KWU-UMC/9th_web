import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tmdb } from '../lib/tmdb';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import type { MovieDetails, Credits } from '../types/movie';

const BACKDROP_BASE = 'https://image.tmdb.org/t/p/w1280';
const POSTER_BASE   = 'https://image.tmdb.org/t/p/w500';
const PROFILE_BASE  = 'https://image.tmdb.org/t/p/w185';

export default function MovieDetailPage() {
  const { movieId } = useParams();                 // ✅ /movies/:movieId
  const id = Number(movieId);
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setErr('잘못된 접근입니다.');
      setLoading(false);
      return;
    }
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const [dRes, cRes] = await Promise.all([
          tmdb.get<MovieDetails>(`/movie/${id}`, { params: { language: 'ko-KR' } }),
          tmdb.get<Credits>(`/movie/${id}/credits`, { params: { language: 'ko-KR' } }),
        ]);

        if (cancelled) return;
        setDetails(dRes.data);
        setCredits(cRes.data);
        // UX: 상세 페이지 들어올 때 상단으로
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e: any) {
        if (cancelled) return;
        setErr(e?.response?.status === 401 ? '인증 실패(401): 토큰을 확인하세요.' : '요청 실패');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [id]);

  const directors = useMemo(
    () => credits?.crew.filter((p) => p.job === 'Director') ?? [],
    [credits]
  );

  if (loading) return <Spinner />;
  if (err) return <ErrorBox message={err} />;
  if (!details) return <ErrorBox message="상세 정보를 찾을 수 없습니다." />;

  const year = details.release_date?.slice(0, 4) ?? '-';
  const hours = details.runtime ? Math.floor(details.runtime / 60) : 0;
  const mins  = details.runtime ? details.runtime % 60 : 0;

  const backdropUrl = details.backdrop_path ? `${BACKDROP_BASE}${details.backdrop_path}` : undefined;
  const posterUrl   = details.poster_path   ? `${POSTER_BASE}${details.poster_path}`   : undefined;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Hero / 백드롭 */}
      <section className="relative overflow-hidden rounded-2xl">
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={details.title}
            className="h-72 w-full object-cover md:h-96"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end p-6 md:p-8">
          <div className="flex items-end gap-5">
            {posterUrl && (
              <img
                src={posterUrl}
                alt={details.title}
                className="hidden h-40 w-28 rounded-lg object-cover shadow-lg sm:block md:h-56 md:w-40"
              />
            )}
            <div className="text-white">
              <h1 className="text-2xl font-bold md:text-3xl">{details.title}</h1>
              <div className="mt-2 text-sm text-gray-200">{year} · {details.vote_average?.toFixed(1)}점 · {details.runtime ? `${hours}시간 ${mins}분` : '상영시간 정보 없음'}</div>
              {details.tagline && <p className="mt-3 italic text-gray-300">{details.tagline}</p>}
              <p className="mt-3 max-w-3xl text-sm text-gray-100">{details.overview || '줄거리 정보가 없습니다.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 감독/출연 */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-white">감독/출연</h2>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {directors.map((d) => (
            <PersonBubble key={`dir-${d.id}`} name={d.name} role="Director" profilePath={d.profile_path} />
          ))}
          {credits?.cast.slice(0, 16).map((c) => (
            <PersonBubble key={`cast-${c.id}`} name={c.name} role={c.character ?? ''} profilePath={c.profile_path} />
          ))}
        </div>
      </section>
    </div>
  );

  function PersonBubble({
    name,
    role,
    profilePath,
  }: { name: string; role: string; profilePath: string | null }) {
    const url = profilePath ? `${PROFILE_BASE}${profilePath}` : undefined;
    return (
      <div className="flex flex-col items-center text-center">
        <div className="h-20 w-20 overflow-hidden rounded-full ring-1 ring-white/10 md:h-24 md:w-24">
          {url ? (
            <img src={url} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white/10 text-xs text-gray-300">No Image</div>
          )}
        </div>
        <div className="mt-2 line-clamp-1 text-sm font-medium text-white">{name}</div>
        <div className="line-clamp-1 text-xs text-gray-400">{role}</div>
      </div>
    );
  }
}
