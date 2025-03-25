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
import useFetch from "@/services/useFetch";
import {
  fetchAllTrending,
} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { useEffect, useState } from "react";
import AllTrendingCard from "@/components/AllTrendingCard";

export default function Index() {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {
    data: allTrending,
    loading: allTrendingLoading,
    error: allTrendingError,
    refetch: loadAllTrending,
    reset: resetAllTrending,
  } = useFetch(fetchAllTrending);

  const onRefresh = () => {
    loadAllTrending();
  };

  useEffect(() => {
    if (allTrendingLoading) {
      setRefreshing(true);
    } else {
      setRefreshing(false);
    }
  }, [allTrendingLoading]);

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
        {allTrendingError ? (
          <Text className="text-lg text-white font-bold mt-5">
            Error: {allTrendingError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
              <Text className="text-3xl text-white font-bold mt-5 mb-3">
                Trending Today
              </Text>

              <FlatList
                data={allTrending}
                renderItem={({ item }) => <AllTrendingCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 20,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
