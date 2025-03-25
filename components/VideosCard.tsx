import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface Props {
  image: string;
  link: string;
  name: string;
}

const VideosCard = ({ image, link, name }: Props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(`https://www.youtube.com/watch?v=${link}`)
        }
        style={{ width: 250, height: 150, marginTop: 15 }}
      >
        <ImageBackground source={{ uri: image }} style={styles.card}>
          <View 
        //   className="flex-1 w-full justify-center items-center bg-black bg-opacity-25"
          >
            <Image style={styles.image} source={icons.play} />
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <View className="w-60">
        <Text
          className="text-sm font-extrabold text-white mt-2"
          numberOfLines={2}
        >
          {name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes full screen height
    justifyContent: "center", // Centers vertically
    alignItems: "center", // Centers horizontally
  },
  card: {
    flex: 1,
    marginVertical: 0,
    marginHorizontal: 0,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 75, // Set a smaller width
    height: 75, // Set a smaller height
    alignSelf: "center", // Ensures it stays centered
  },
});

export default VideosCard;
