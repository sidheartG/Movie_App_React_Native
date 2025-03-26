import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/services/useFetch";
import {
  fetchAiringTodaySeries,
  fetchOnTheAirSeries,
  fetchPopularSeries,
  fetchTopRatedSeries,
  fetchTrendingSeries,
} from "@/services/api";
import AllTrendingCard from "@/components/AllTrendingCard";
import TrendingCard from "@/components/TrendingCard";
import MovieCard from "@/components/MovieCard";

const series = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const {
    data: trendingSeries,
    loading: trendingSeriesLoading,
    error: trendingSeriesError,
    refetch: loadTrendingSeries,
    reset: resetTrendingSeries,
  } = useFetch(fetchTrendingSeries);

  const {
    data: onTheAirSeries,
    loading: onTheAirSeriesLoading,
    error: onTheAirSeriesError,
    refetch: loadOnTheAirSeries,
    reset: resetOnTheAirSeries,
  } = useFetch(fetchOnTheAirSeries);

  const {
    data: airingTodaySeries,
    loading: airingTodaySeriesLoading,
    error: airingTodaySeriesError,
    refetch: loadAiringTodaySeries,
    reset: resetAiringTodaySeries,
  } = useFetch(fetchAiringTodaySeries);

  const {
    data: popularSeries,
    loading: popularSeriesLoading,
    error: popularSeriesError,
    refetch: loadPopularSeries,
    reset: resetPopularSeries,
  } = useFetch(fetchPopularSeries);

  const {
    data: topRatedSeries,
    loading: topRatedSeriesLoading,
    error: topRatedSeriesError,
    refetch: loadTopRatedSeries,
    reset: resetTopRatedSeries,
  } = useFetch(fetchTopRatedSeries);

  const onRefresh = () => {
    loadTrendingSeries();
    loadOnTheAirSeries();
    loadAiringTodaySeries();
    loadPopularSeries();
    loadTopRatedSeries();
  };

  useEffect(() => {
    if (
      trendingSeriesLoading ||
      onTheAirSeriesLoading ||
      airingTodaySeriesLoading ||
      popularSeriesLoading ||
      topRatedSeriesLoading
    ) {
      setRefreshing(true);
    } else {
      setRefreshing(false);
    }
  }, [
    trendingSeriesLoading,
    onTheAirSeriesLoading,
    airingTodaySeriesLoading,
    popularSeriesLoading,
    topRatedSeriesLoading,
  ]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto mb-5" />
        {trendingSeriesError ||
        onTheAirSeriesError ||
        airingTodaySeriesError ||
        popularSeriesError ||
        topRatedSeriesError ? (
          <Text className="text-lg text-white font-bold mt-5">
            Error:{" "}
            {trendingSeriesError?.message ||
              onTheAirSeriesError?.message ||
              airingTodaySeriesError?.message ||
              popularSeriesError?.message ||
              topRatedSeriesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            {trendingSeries && (
              <>
                <Text className="text-white text-lg font-bold mb-3">
                  Trending Series
                </Text>
                <FlatList
                  data={trendingSeries.slice(0, 8)}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.id}
                />
              </>
            )}
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                On the Air Series
              </Text>

              <FlatList
                data={onTheAirSeries}
                horizontal
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View className="w-4" />}
                showsHorizontalScrollIndicator={false}
              />
            </>
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Airing Today
              </Text>

              <FlatList
                data={airingTodaySeries}
                horizontal
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View className="w-4" />}
                showsHorizontalScrollIndicator={false}
              />
            </>
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Popular Series
              </Text>

              <FlatList
                data={popularSeries}
                horizontal
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View className="w-4" />}
                showsHorizontalScrollIndicator={false}
              />
            </>
            <View className="mb-20">
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Top Rated Series
              </Text>

              <FlatList
                data={topRatedSeries}
                horizontal
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View className="w-4" />}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default series;
