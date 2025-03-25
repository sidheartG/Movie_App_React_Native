interface Movie {
  id: number;
  name: string;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  media_type: string;
  original_language: string;
  original_name: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  first_air_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingMovie {
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}

interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingCardProps {
  movie: Movie;
  index: number;
}


interface MovieVideosData {
  id: Int,
  results: Array<MovieVideoResult>
}

interface MovieVideoResult{
  id: string,
  iso_3166_1: string,
  iso_639_1: string,
  key: string,
  name: string,
  official: boolean,
  published_at: string,
  site: string,
  size: number,
  type: string
}

interface MovieCreditsdata{
  cast: List<Cast>,
  crew: List<Crew>,
  id: number
}

interface Cast{
  adult: boolean,
  cast_id: number,
  character: string,
  credit_id: string,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  order: number,
  original_name: string,
  popularity: number,
  profile_path: string
}

interface Crew{
  adult: boolean,
  credit_id: string,
  department: string,
  gender: number,
  id: number,
  job: string,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string
}