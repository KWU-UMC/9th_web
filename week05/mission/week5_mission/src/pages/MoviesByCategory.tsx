import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import { tmdb } from '../lib/tmdb'
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import { Link } from 'react-router-dom';


const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

type Props = {
  endpoint: string;      // 예: 'movie/popular' | 'movie/top_rated' | 'movie/upcoming' | 'movie/now_playing'
  title: string;
};

export default function MoviesByCategory({ endpoint, title }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const { data } = await tmdb.get<MovieResponse>(`/${endpoint}`, {
          params: { language: 'ko-KR', page },
        });
        if (cancelled) return;
        setMovies(data.results ?? []);
        setTotalPages(data.total_pages);
      } catch (e: any) {
        if (cancelled) return;
        console.error('TMDB error:', e?.response?.status, e?.response?.data || e?.message);
        setErr(e?.response?.status === 401 ? '인증 실패(401): 토큰을 확인하세요.' : '요청 실패');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [endpoint, page]);

  const onPrev = () => setPage(p => Math.max(1, p - 1));
  const onNext = () => setPage(p => (totalPages ? Math.min(totalPages, p + 1) : p + 1));

  if (loading) return <Spinner />;
  if (err) return <ErrorBox message={err} />;

  return (
    <div className="py-2">
      <h1 className="mb-6 text-2xl font-bold">{title}</h1>

      <ul className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((m) => {
          const img = m.poster_path ? `${IMG_BASE}${m.poster_path}` : '/placeholder.png';
          return (
            <li key={m.id} className="group relative overflow-hidden rounded-3xl bg-white/5 shadow-lg ring-1 ring-black/5 transition duration-300 hover:shadow-2xl">
              <Link to={`/movies/${m.id}`}>
                <div className="relative aspect-[2/3]">
                  <img
                    src={img}
                    alt={m.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:blur-sm"
                  />
                {/* hover 오버레이 */}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-4
                                bg-gradient-to-t from-black/70 via-black/30 to-transparent
                                opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="text-white text-base font-semibold">{m.title}</h3>
                  <p className="mt-1 text-xs text-gray-200 line-clamp-2">
                    {m.overview || '설명이 없습니다.'}
                  </p>
                  <div className="mt-2 text-[11px] text-gray-300">
                    개봉: {m.release_date || '-'} · 평점: {m.vote_average?.toFixed(1) ?? '-'}
                  </div>
                </div>

                <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[11px] text-white backdrop-blur-sm">
                  ★ {m.vote_average?.toFixed(1) ?? '-'}
                </span>
              </div>
              </Link>
            </li>
            
          );
        })}
      </ul>

      {/* 페이지네이션 */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={onPrev}
          disabled={page <= 1}
          className={`rounded-lg px-3 py-2 text-sm ring-1 ring-gray-300 transition 
            ${page <= 1 ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-50'}`}
        >
          이전
        </button>
        <span className="text-sm text-gray-600">페이지 {page}{totalPages ? ` / ${totalPages}` : ''}</span>
        <button
          onClick={onNext}
          disabled={!!totalPages && page >= totalPages}
          className={`rounded-lg px-3 py-2 text-sm ring-1 ring-gray-300 transition 
            ${!!totalPages && page >= totalPages ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-50'}`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
