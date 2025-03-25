import { View, Text, Image } from "react-native";
import React from "react";

interface Props {
  name: string;
  profile_path: string;
}

const PersonCard = ({ name, profile_path }: Props) => {
  return (
    <View className="w-24 relative">
      <Image
        source={{
          uri: profile_path
            ? `https://image.tmdb.org/t/p/w500${profile_path}`
            : "https://placehold.co/600x400/1a1a1a/ffffff.png",
        }}
        className="w-24 h-32 rounded-lg"
        resizeMode="cover"
      />
      <Text
        className="text-xs font-extrabold text-white mt-2 ali"
        numberOfLines={2}
      >
        {name}
      </Text>
    </View>
  );
};

export default PersonCard;
