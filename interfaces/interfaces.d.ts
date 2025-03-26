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
  id: Int;
  results: Array<MovieVideoResult>;
}

interface MovieVideoResult {
  id: string;
  iso_3166_1: string;
  iso_639_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

interface MovieCreditsdata {
  cast: Array<Cast>;
  crew: Array<Crew>;
  id: number;
}

interface Cast {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

interface Crew {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

interface SeriesResult{
  adult: boolean,
  backdrop_path: string,
  first_air_date: string,
  genre_ids: Array<number>,
  id: number,
  name: string,
  origin_country: Array<string>,
  original_language: string,
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: string,
  vote_average: number,
  vote_count: number
}

interface SeriesDetailsOneData {
  adult: boolean = false;
  backdrop_path: string = "";
  created_by: Array<CreatedBy> = [];
  episode_run_time: Array<any> = [];
  first_air_date: string = "";
  genres: Array<Genre> = [];
  homepage: string = "";
  id: number = 0;
  in_production: boolean = false;
  languages: Array<string> = [];
  last_air_date: string = "";
  last_episode_to_air: LastEpisodeToAir = LastEpisodeToAir();
  name: string = "";
  networks: Array<Network> = [];
  next_episode_to_air: NextEpisodeToAir = NextEpisodeToAir();
  number_of_episodes: number = 0;
  number_of_seasons: number = 0;
  origin_country: Array<string> = [];
  original_language: string = "";
  original_name: string = "";
  overview: string = "";
  popularity: number = 0.0;
  poster_path: string = "";
  production_companies: Array<ProductionCompany> = [];
  production_countries: Array<ProductionCountry> = [];
  seasons: Array<Season> = [];
  spoken_languages: Array<SpokenLanguage> = [];
  status: string = "";
  tagline: string = "";
  type: string = "";
  vote_average: number = 0.0;
  vote_count: number = 0;
}

interface SpokenLanguage {
  english_name: string = "";
  iso_639_1: string = "";
  name: string = "";
}

interface CreatedBy {
  credit_id: string = "";
  gender: number = 0;
  id: number = 0;
  name: string = "";
  original_name: string = "";
  profile_path: string = "";
}

interface Genre {
  id: number = 0;
  name: string = "";
}

interface LastEpisodeToAir {
  air_date: string = "";
  episode_number: number = 0;
  episode_type: string = "";
  id: number = 0;
  name: string = "";
  overview: string = "";
  production_code: string = "";
  runtime: number = 0;
  season_number: number = 0;
  show_id: number = 0;
  still_path: string = "";
  vote_average: number = 0.0;
  vote_count: number = 0;
}

interface Network {
  id: number = 0;
  logo_path: string = "";
  name: string = "";
  origin_country: string = "";
}

interface NextEpisodeToAir {
  air_date: string = "";
  episode_number: number = 0;
  episode_type: string = "";
  id: number = 0;
  name: string = "";
  overview: string = "";
  production_code: string = "";
  runtime: any? = null;
  season_number: number = 0;
  show_id: number = 0;
  still_path: any? = null;
  vote_average: number = 0;
  vote_count: number = 0;
}

interface ProductionCompany {
  id: number = 0;
  logo_path: string = "";
  name: string = "";
  origin_country: string = "";
}

interface ProductionCountry {
  iso_3166_1: string = "";
  name: string = "";
}

interface Season {
  air_date: string = "";
  episode_count: number = 0;
  id: number = 0;
  name: string = "";
  overview: string = "";
  poster_path: string = "";
  season_number: number = 0;
  vote_average: number = 0.0;
}
