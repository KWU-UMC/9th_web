export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number | null;
  vote_average: number;
  tagline: string | null;
  genres: {
    id: number;
    name: string;
  }[];
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
  images: {
    file_path: string;
  }[];
}