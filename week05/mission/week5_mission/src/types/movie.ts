export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  // 필요하다면 추가 필드도 정의 가능
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export interface Genre { id: number; name: string; }

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  runtime: number | null;
  vote_average: number;
  tagline?: string;
  genres?: Genre[];
  credits?: Credits;
}

export interface Cast {
  id: number;
  name: string;
  character?: string;
  profile_path: string | null;
  order?: number;
}

export interface Crew {
  id: number;
  name: string;
  job?: string;
  department?: string;
  profile_path: string | null;
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

