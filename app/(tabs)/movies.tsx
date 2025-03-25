import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import {
  fetchMovies,
  fetchNowPlayingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  getTrendingMovies,
} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";
import { useEffect, useState } from "react";

export default function Movies() {
  const router = useRouter();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
    refetch: loadTrendingMovies,
    reset: resetTrendingMovies,
  } = useFetch(getTrendingMovies);

  const {
    data: nowPlayingMovies,
    loading: nowPlayingMoviesLoading,
    error: nowPlayingMoviesError,
    refetch: loadNowPlayingMovies,
    reset: resetNowPlayingMovies,
  } = useFetch(fetchNowPlayingMovies);

  const {
    data: topRatedMovies,
    loading: topRatedMoviesLoading,
    error: topRatedMoviesError,
    refetch: loadTopRatedMovies,
    reset: resetTopRatedMovies,
  } = useFetch(fetchTopRatedMovies);

  const {
    data: upcomingMovies,
    loading: upcomingMoviesLoading,
    error: upcomingMoviesError,
    refetch: loadUpcomingMovies,
    reset: resetUpcomingMovies,
  } = useFetch(fetchUpcomingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset: resetMovies,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  const onRefresh = () => {
    loadTrendingMovies();
    loadNowPlayingMovies();
    loadTopRatedMovies();
    loadUpcomingMovies();
    loadMovies();
  };

  useEffect(() => {
    if (
      moviesLoading ||
      trendingMoviesLoading ||
      nowPlayingMoviesLoading ||
      topRatedMoviesLoading ||
      upcomingMoviesLoading
    ) {
      setRefreshing(true);
    } else {
      setRefreshing(false);
    }
  }, [
    moviesLoading,
    trendingMoviesLoading,
    nowPlayingMoviesLoading,
    topRatedMoviesLoading,
    upcomingMoviesLoading,
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
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {
          // moviesLoading ||
          // trendingMoviesLoading ||
          // nowPlayingMoviesLoading ||
          // topRatedMoviesLoading ||
          // upcomingMoviesLoading ? (
          //   <ActivityIndicator
          //   size="large"
          //   color="#0000ff"
          //   // className="mt-10 self-center"
          //   />
          // ) :
          moviesError ||
          trendingMoviesError ||
          nowPlayingMoviesError ||
          topRatedMoviesError ||
          upcomingMoviesError ? (
            <Text className="text-lg text-white font-bold mt-5">
              Error:{" "}
              {moviesError?.message ||
                trendingMoviesError?.message ||
                nowPlayingMoviesError?.message ||
                topRatedMoviesError?.message ||
                upcomingMoviesError?.message}
            </Text>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar
                onPress={() => {
                  router.push("/search");
                }}
                placeholder="Search..."
              />
              {trendingMovies && (
                <View className="mt-10">
                  <Text className="text-lg text-white font-bold mb-3">
                    Trending Movies
                  </Text>

                  <FlatList
                    data={trendingMovies.slice(0, 8)}
                    horizontal
                    ItemSeparatorComponent={() => <View className="w-6" />}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                      <TrendingCard movie={item} index={index} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                  />
                </View>
              )}
              <>
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Latest Movies
                </Text>

                <FlatList
                  data={movies}
                  horizontal
                  renderItem={({ item }) => <MovieCard {...item} />}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  showsHorizontalScrollIndicator={false}
                  // numColumns={3}
                  // columnWrapperStyle={{
                  //   justifyContent: "flex-start",
                  //   gap: 20,
                  //   paddingRight: 5,
                  //   marginBottom: 10,
                  // }}
                  // className="mt-2 pb-32"
                  // scrollEnabled={false}
                />
              </>

              <>
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Now Playing Movies
                </Text>

                <FlatList
                  data={nowPlayingMovies}
                  horizontal
                  renderItem={({ item }) => <MovieCard {...item} />}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  showsHorizontalScrollIndicator={false}
                />
              </>

              <>
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Top Rated Movies
                </Text>

                <FlatList
                  data={topRatedMovies}
                  horizontal
                  renderItem={({ item }) => <MovieCard {...item} />}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  showsHorizontalScrollIndicator={false}
                />
              </>

              <View className="mb-20">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Upcoming Movies
                </Text>

                <FlatList
                  data={upcomingMovies}
                  horizontal
                  renderItem={({ item }) => <MovieCard {...item} />}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
          )
        }
      </ScrollView>
    </View>
  );
}
