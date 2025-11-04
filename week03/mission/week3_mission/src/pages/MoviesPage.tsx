import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Movie, MovieResponse } from '../types/movie';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const raw = import.meta.env.VITE_TMDB_TOKEN;
        const token = (typeof raw === 'string' ? raw : '').trim();

        if (!token) {
            console.error('No TMDB token found from .env');
        }
        const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc',
        {
            headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`, // 여기만 Bearer
            },
        }
        );


        setMovies(data.results ?? []);
      } catch (e: any) {
        setErr(e?.response?.status === 401 ? '인증 실패(401): 토큰 확인' : '요청 실패');
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6 text-gray-600">불러오는 중…</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">
      <h1 className="mb-6 text-3xl font-bold">인기 영화</h1>

      {/* ✅ 핵심: 그리드 + 기본 열 수 지정 */}
      <ul className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((m) => {
          const img = m.poster_path ? `${IMG_BASE}${m.poster_path}` : '/placeholder.png';
          return (
            <li
              key={m.id}
              className="group relative overflow-hidden rounded-3xl bg-white/5 shadow-lg ring-1 ring-black/5 transition duration-300 hover:shadow-2xl"
            >
              {/* 카드(2:3 비율 고정) */}
              <div className="relative aspect-[2/3]">
                {/* 포스터 */}
                <img
                  src={img}
                  alt={m.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:blur-sm"
                />

                {/* ✅ hover에서만 보이는 오버레이 */}
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

                {/* 평점 배지(옵션) */}
                <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[11px] text-white backdrop-blur-sm">
                  ★ {m.vote_average?.toFixed(1) ?? '-'}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
