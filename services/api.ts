export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchAllTrending = async () => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/trending/all/day?language=en-US`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const searchAll = async ({
  query,
}: {
  query: string;
}): Promise<Movie[]> => {
  const endpoint = `${
    TMDB_CONFIG.BASE_URL
  }/search/multi?query=${encodeURIComponent(query)}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

/////////////////////////////////////////////////----Movie API'S----////////////////////////////////////////////////////

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchTrendingMovies = async () => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/trending/movie/day`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      // @ts-ignore
      throw new Error("Failed to fetch movie details", response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchNowPlayingMovies = async () => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/now_playing`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchTopRatedMovies = async () => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/top_rated`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchUpcomingMovies = async () => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/upcoming`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchRecommendedMovies = async (movieId: string) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}/recommendations?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchSimilarMovies = async (movieId: string) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}/similar?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchMovieVideos = async (
  movieId: string
): Promise<MovieVideosData> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}/videos`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      // @ts-ignore
      throw new Error("Failed to fetch movie videos", response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchMovieCredits = async (
  movieId: string
): Promise<MovieCreditsdata> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}/credits`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      // @ts-ignore
      throw new Error("Failed to fetch movie credits", response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/////////////////////////////////////////////////----SERIES API'S----////////////////////////////////////////////////////

export const fetchTrendingSeries = async () => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/trending/tv/day`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch trending series", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchOnTheAirSeries = async () => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/tv/on_the_air`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch on the air series", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchAiringTodaySeries = async () => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/tv/airing_today`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch airing today series", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchPopularSeries = async () => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/tv/popular`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch popular series", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchTopRatedSeries = async () => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/tv/top_rated`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch top rated series", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchSeriesDetails = async (
  seriesId: string
): Promise<SeriesDetailsOneData> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/tv/${seriesId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      // @ts-ignore
      throw new Error("Failed to fetch series details", response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSeriesVideos = async (
  seriesId: string
): Promise<MovieVideosData> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/tv/${seriesId}/videos`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      // @ts-ignore
      throw new Error("Failed to fetch tv videos", response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSeriesCredits = async (
  seriesId: string
): Promise<MovieCreditsdata> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/tv/${seriesId}/credits`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      // @ts-ignore
      throw new Error("Failed to fetch tv credits", response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchRecommendedSeries = async (seriesId: string) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/tv/${seriesId}/recommendations?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to recommended series", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchSimilarSeries = async (seriesId: string) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/tv/${seriesId}/similar?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to Similar series", response.statusText);
  }

  const data = await response.json();

  return data.results;
};
