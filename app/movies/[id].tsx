import {
  View,
  Text,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import {
  fetchMovieDetails,
  fetchMovieVideos,
  fetchRecommendedMovies,
} from "@/services/api";
import { icons } from "@/constants/icons";
import Carousal from "@/components/Carousal";
import MovieCard from "@/components/MovieCard";

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
  } = useFetch(() => fetchMovieDetails(id as string));

  const {
    data: videos,
    loading: videosLoading,
    error: videosError,
  } = useFetch(() => fetchMovieVideos(id as string));

  const {
    data: recommendedMovies,
    loading: recommendedMoviesLoading,
    error: recommendedMoviesError,
  } = useFetch(() => fetchRecommendedMovies(id as string));

  const trailers = videos?.results.filter(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  const trailerImages = trailers?.map(
    (video) => `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`
  );
  const trailerLinks = trailers?.map(
    (video) => `https://www.youtube.com/watch?v=${video.key}`
  );

  console.log("Movie Details", movie);
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
        {loading || videosLoading || recommendedMoviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : error || videosError || recommendedMoviesError ? (
          <Text className="text-lg text-white font-bold mt-5">
            Error:{" "}
            {error?.message ||
              videosError?.message ||
              recommendedMoviesError?.message}
          </Text>
        ) : (
          <>
            <View>
              <Carousal
                images={trailerImages ?? []}
                links={trailerLinks ?? []}
              />
            </View>
            <View className="flex-col items-start justify-center mt-5 px-5">
              <Text className="text-white font-bold text-xl">
                {movie?.title}
              </Text>
              <View className="flex-row items-center gap-x-1 mt-2">
                <Text className="text-light-200 text-sm">
                  {movie?.release_date?.split("-")[0]}
                </Text>
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
                value={movie?.genres?.map((g) => g.name).join("-")}
              />
              <View className="flex flex-row justify-between w-1/2">
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
            <View className="ml-5">
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                More like this
              </Text>

              <FlatList
                data={recommendedMovies}
                horizontal
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View className="w-4" />}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </>
        )}
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-5 right-0 mx-6 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={() => router.push("/")}
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
