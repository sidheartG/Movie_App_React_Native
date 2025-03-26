import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";

const TrendingCard = ({
  movie: { id, poster_path, title, name, media_type },
  index,
}: TrendingCardProps) => {
  const href = media_type === "movie" ? "movies" : "tv";
  return (
    <Link href={`/${href}/${id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View
          className={
            // "absolute bottom-9 -left-3.5 px-2 py-1 rounded-full"
            "absolute bottom-9 -left-3.5" +
            (index + 1 >= 10 ? "  " : " px-2 ") +
            "py-1 rounded-full"
          }
        >
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-6xl ">
                {" "}
                {index + 1}
              </Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text
          className="text-sm font-extrabold mt-2 text-light-200"
          numberOfLines={2}
        >
          {title || name}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
