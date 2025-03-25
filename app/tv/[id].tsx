import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const TvShowDetails = () => {
    const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>TvShowDetails</Text>
    </View>
  )
}

export default TvShowDetails