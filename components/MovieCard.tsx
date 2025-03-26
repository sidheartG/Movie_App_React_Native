import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TMDB_CONFIG } from "@/services/api";
import { Link, useRouter } from "expo-router";
import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
  media_type,
  name,
  first_air_date,
}: Movie ) => {
  const router = useRouter();
  const href = media_type === "movie" ? "movies" : "tv";
  return (
    <View>
      <TouchableOpacity
        className="w-32 relative"
        onPress={() => router.navigate(`/${href}/${id}`)}
      >
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <Text
          className="text-sm font-extrabold text-white mt-2"
          numberOfLines={1}
        >
          {title || name}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
          {vote_average.toFixed(1)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0] || first_air_date?.split("-")[0]}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase mr-1">
            {media_type}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MovieCard;
