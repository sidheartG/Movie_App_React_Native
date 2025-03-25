import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { icons } from "@/constants/icons";

const AllTrendingCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
  media_type,
  name,
  first_air_date,
}: Movie) => {
  const href = media_type === "movie" ? "movies" : "tv";

  return (
    <Link href={`/${href}/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title || name}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0] || first_air_date?.split("-")[0]}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            {media_type}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default AllTrendingCard;
