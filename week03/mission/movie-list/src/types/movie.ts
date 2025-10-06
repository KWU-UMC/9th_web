export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export interface Genre {
  id: number;
  name: string;
}

export interface TMovieDetails{
  genres: Genre[];
  overview: string;
  poster_path: string | null;
  release_date: string;
  runtime: number;
  tagline: string;
  title: string;
  vote_average: number;
}

export interface PersonBase{
  id: number;
  name: string;
  original_name: string;
  profile_path: string | null;
}

export interface CastMember extends PersonBase{
  cast_id?: number;
}

export interface CrewMember extends PersonBase{
  credit_id: string;
  job: string;
}

export interface TMovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}