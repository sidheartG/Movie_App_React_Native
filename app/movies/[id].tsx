import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieVideos,
  fetchRecommendedMovies,
  fetchSimilarMovies,
} from "@/services/api";
import { icons } from "@/constants/icons";
import Carousal from "@/components/Carousal";
import MovieCard from "@/components/MovieCard";
import PersonCard from "@/components/PersonCard";
import VideosCard from "@/components/VideosCard";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    data: movie,
    loading,
    error,
    refetch: refetchMovieDetails,
    reset,
  } = useFetch(() => fetchMovieDetails(id as string));

  const {
    data: videos,
    loading: videosLoading,
    error: videosError,
    refetch: refetchMovieVideos,
    reset: resetVideos,
  } = useFetch(() => fetchMovieVideos(id as string));

  const {
    data: recommendedMovies,
    loading: recommendedMoviesLoading,
    error: recommendedMoviesError,
    refetch: refetchRecommendedMovies,
    reset: resetRecommendedMovies,
  } = useFetch(() => fetchRecommendedMovies(id as string));

  const {
    data: similarMovies,
    loading: similarMoviesLoading,
    error: similarMoviesError,
    refetch: refetchSimilarMovies,
    reset: resetSimilarMovies,
  } = useFetch(() => fetchSimilarMovies(id as string));

  const {
    data: movieCredits,
    loading: movieCreditsLoading,
    error: movieCreditsError,
    refetch: refetchMovieCredits,
    reset: resetMovieCredits,
  } = useFetch(() => fetchMovieCredits(id as string));

  const trailers = videos?.results.filter(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  const trailerImages = trailers?.map(
    (video) => `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`
  );
  const trailerLinks = trailers?.map((video) => video.key);

  const otherVideos = videos?.results.filter(
    (video) => video.type !== "Trailer" && video.site === "YouTube"
  );

  useEffect(() => {
    refetchMovieDetails();
    refetchMovieVideos();
    refetchRecommendedMovies();
    refetchSimilarMovies();
    refetchMovieCredits();
    return () => {
      reset();
      resetVideos();
      resetRecommendedMovies();
      resetSimilarMovies();
      resetMovieCredits();
    };
  }, [id]);

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
              /> */}
        {loading ||
        videosLoading ||
        recommendedMoviesLoading ||
        similarMoviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : error ||
          videosError ||
          recommendedMoviesError ||
          similarMoviesError ? (
          <Text className="text-lg text-white font-bold mt-5">
            Error:{" "}
            {error?.message ||
              videosError?.message ||
              recommendedMoviesError?.message ||
              similarMoviesError?.message}
          </Text>
        ) : (
          <>
            <View>
              <Carousal
                images={trailerImages ?? []}
                links={trailerLinks ?? []}
              />
            </View>
            <View className="flex-col items-start justify-center mt-5 px-3">
              <Text className="text-white font-bold text-xl">
                {movie?.title}
              </Text>
              <View className="flex-row items-center gap-x-1 mt-2">
                <Text className="text-light-200 text-sm">
                  {movie?.release_date?.split("-")[0]}
                </Text>
                <Text className="text-light-200 text-sm">•</Text>
                <Text className="text-light-200 text-sm">
                  {movie?.runtime}m
                </Text>
              </View>
              <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                <Image source={icons.star} className="size-4" />
                <Text className="text-white font-bold text-sm">
                  {Math.round(movie?.vote_average ?? 0)}/10
                </Text>
                <Text className="text-light-200 text-sm">
                  ({movie?.vote_count} votes)
                </Text>
              </View>
              <MovieInfo label="Overview" value={movie?.overview} />
              <MovieInfo
                label="Genres"
                value={movie?.genres?.map((g) => g.name).join(" | ")}
              />
              <View className="flex flex-col justify-between w-1/2">
                <MovieInfo
                  label="Budget"
                  value={`$${(movie?.budget ?? 0) / 100000} million`}
                />
                <MovieInfo
                  label="Revenue"
                  value={`$${Math.round(movie?.revenue ?? 0) / 100000} million`}
                />
              </View>
              <MovieInfo
                label="Production Companies"
                value={
                  movie?.production_companies?.map((c) => c.name).join(" - ") ||
                  "N/A"
                }
              />
            </View>
            {otherVideos && otherVideos.length > 0 && (
              <View className="mx-3">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Top Billed Cast
                </Text>

                <FlatList
                  data={otherVideos}
                  horizontal
                  renderItem={({ item }) => (
                    <VideosCard
                      image={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
                      link={item.key}
                      name={item.name}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={() => <View className="w-3" />}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
            {movieCredits &&
              movieCredits.cast &&
              movieCredits.cast.length > 0 && (
                <View className="mx-3">
                  <Text className="text-lg text-white font-bold mt-5 mb-3">
                    Top Billed Cast
                  </Text>

                  <FlatList
                    data={movieCredits.cast.slice(0, 10)}
                    horizontal
                    renderItem={({ item }) => <PersonCard {...item} />}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => <View className="w-3" />}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              )}
            {similarMovies && similarMovies.length > 0 && (
              <View className="mx-3">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  More like this
                </Text>

                <FlatList
                  data={similarMovies}
                  horizontal
                  renderItem={({ item }) => <MovieCard {...item} />}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={() => <View className="w-3" />}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}

            {recommendedMovies && recommendedMovies.length > 0 && (
              <View className="mx-3">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  What's next?
                </Text>

                <FlatList
                  data={recommendedMovies}
                  horizontal
                  renderItem={({ item }) => <MovieCard {...item} />}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={() => <View className="w-3" />}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-6 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={() => router.back()}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
