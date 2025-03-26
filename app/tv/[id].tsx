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
  fetchRecommendedSeries,
  fetchSeriesCredits,
  fetchSeriesDetails,
  fetchSeriesVideos,
  fetchSimilarMovies,
  fetchSimilarSeries,
} from "@/services/api";
import { icons } from "@/constants/icons";
import Carousal from "@/components/Carousal";
import MovieCard from "@/components/MovieCard";
import PersonCard from "@/components/PersonCard";
import VideosCard from "@/components/VideosCard";
import SeriesSeasonCard from "@/components/SeriesSeasonCard";

interface SeriesInfoProps {
  label: string;
  value?: string | number | null;
}

const SeriesInfo = ({ label, value }: SeriesInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const SeriesDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    data: series,
    loading,
    error,
    refetch: refetchSeriesDetails,
    reset,
  } = useFetch(() => fetchSeriesDetails(id as string));

  const {
    data: videos,
    loading: videosLoading,
    error: videosError,
    refetch: refetchSeriesVideos,
    reset: resetVideos,
  } = useFetch(() => fetchSeriesVideos(id as string));

  const {
    data: recommendedSeries,
    loading: recommendedSeriesLoading,
    error: recommendedSeriesError,
    refetch: refetchRecommendedSeries,
    reset: resetRecommendedSeries,
  } = useFetch(() => fetchRecommendedSeries(id as string));

  const {
    data: similarSeries,
    loading: similarSeriesLoading,
    error: similarSeriesError,
    refetch: refetchSimilarSeries,
    reset: resetSimilarSeries,
  } = useFetch(() => fetchSimilarSeries(id as string));

  const {
    data: seriesCredits,
    loading: seriesCreditsLoading,
    error: seriesCreditsError,
    refetch: refetchSeriesCredits,
    reset: resetSeriesCredits,
  } = useFetch(() => fetchSeriesCredits(id as string));

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
    refetchSeriesDetails();
    refetchSeriesVideos();
    refetchRecommendedSeries();
    refetchSimilarSeries();
    refetchSeriesCredits();
    return () => {
      reset();
      resetVideos();
      resetRecommendedSeries();
      resetSimilarSeries();
      resetSeriesCredits();
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
        recommendedSeriesLoading ||
        similarSeriesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : error ||
          videosError ||
          recommendedSeriesError ||
          similarSeriesError ? (
          <Text className="text-lg text-white font-bold mt-5">
            Error:{" "}
            {error?.message ||
              videosError?.message ||
              recommendedSeriesError?.message ||
              similarSeriesError?.message}
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
                {series?.name}
              </Text>
              <View className="flex-row items-center gap-x-1 mt-2">
                <Text className="text-light-200 text-sm">
                  {series?.first_air_date?.split("-")[0]}
                </Text>
                <Text className="text-light-200 text-sm"> | </Text>
                <Text className="text-light-200 text-sm">
                  {series?.seasons?.length} Seasons
                </Text>
                <Text className="text-light-200 text-sm"> | </Text>
                <Text className="text-light-200 text-sm">
                  {series?.languages?.length} Languages
                </Text>
              </View>
              <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                <Image source={icons.star} className="size-4" />
                <Text className="text-white font-bold text-sm">
                  {Math.round(series?.vote_average ?? 0)}/10
                </Text>
                <Text className="text-light-200 text-sm">
                  ({series?.vote_count} votes)
                </Text>
              </View>
              <SeriesInfo label="Overview" value={series?.overview} />
              <SeriesInfo
                label="Genres"
                value={series?.genres?.map((g) => g.name).join(" | ")}
              />
              <View className="flex flex-col justify-between w-1/2">
                {/* <SeriesInfo
                  label="Budget"
                  value={`$${(series?.budget ?? 0) / 100000} million`}
                />
                <SeriesInfo
                  label="Revenue"
                  value={`$${Math.round(series?.revenue ?? 0) / 100000} million`}
                /> */}
              </View>
              <SeriesInfo
                label="Production Companies"
                value={
                  series?.production_companies
                    ?.map((c) => c.name)
                    .join(" - ") || "N/A"
                }
              />
            </View>
            {series?.seasons && series?.seasons.length > 0 && (
              <View className="mx-3">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Seasons
                </Text>

                <FlatList
                  data={series?.seasons}
                  renderItem={({ item }) => <SeriesSeasonCard {...item} />}
                  keyExtractor={(item) => item.id.toString()}
                  className="mt-2 pb-32"
                  scrollEnabled={false}
                  ItemSeparatorComponent={() => <View className="h-3" />}
                />
              </View>
            )}
            {otherVideos && otherVideos.length > 0 && (
              <View className="mx-3">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Behind the scenes & More
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
            {seriesCredits &&
              seriesCredits.cast &&
              seriesCredits.cast.length > 0 && (
                <View className="mx-3">
                  <Text className="text-lg text-white font-bold mt-5 mb-3">
                    Top Billed Cast
                  </Text>

                  <FlatList
                    data={seriesCredits.cast.slice(0, 10)}
                    horizontal
                    renderItem={({ item }) => <PersonCard {...item} />}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => <View className="w-3" />}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              )}
            {similarSeries && similarSeries.length > 0 && (
              <View className="mx-3">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  More like this
                </Text>

                <FlatList
                  data={similarSeries}
                  horizontal
                  renderItem={({ item }) => <MovieCard {...item} />}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={() => <View className="w-3" />}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}

            {recommendedSeries && recommendedSeries.length > 0 && (
              <View className="mx-3">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  What's next?
                </Text>

                <FlatList
                  data={recommendedSeries}
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

export default SeriesDetails;
