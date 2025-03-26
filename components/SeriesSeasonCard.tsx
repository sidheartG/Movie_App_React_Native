import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface Props {
  name: string;
  poster_path: string;
  episode_count: number;
  air_date: string;
  vote_average: number
}


const SeriesSeasonCard = ({ name, poster_path, episode_count, air_date, vote_average}: Props) => {
  return (
    <View className="flex flex-row ">
      <Image
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://placehold.co/600x400/1a1a1a/ffffff.png",
        }}
        className="w-16 h-24  rounded-lg"
        resizeMode="cover"
      />
      <View className="flex w-full justify-center ml-2">
        <Text
          className="text-lg font-extrabold text-white"
          numberOfLines={2}
        >
          {name}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Text className="text-white font-bold text-xs">Episodes {episode_count}</Text>
          
          <Text className="text-white font-bold text-xs"> | </Text>
          <Text className="text-white font-bold text-xs"> {air_date} </Text>
          <Text className="text-white font-bold text-xs"> | </Text>
          <Image source={icons.star} className="size-3" />
          <Text className="text-white font-bold text-xs">  {vote_average.toFixed(1)} </Text>
        </View>
      </View>
    </View>
  );
};

export default SeriesSeasonCard;
