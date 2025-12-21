export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
  adult: boolean;
}

export interface SearchParams {
  query: string;
  includeAdult: boolean;
  language: string;
}
