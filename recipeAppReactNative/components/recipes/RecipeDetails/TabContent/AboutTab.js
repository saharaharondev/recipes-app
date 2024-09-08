import React from 'react';
import { View, Text } from 'react-native';

const AboutTab = ({ data }) => {
  return (
    <View>
      <Text>{data?.summary?.replace(/<\/?[^>]+(>|$)/g, "") || "No summary available."}</Text>
      <Text>Ready in: {data?.readyInMinutes ?? "N/A"} minutes</Text>
      <Text>Servings: {data?.servings ?? "N/A"}</Text>
      <Text>Price per serving: ${data?.pricePerServing?.toFixed(2) ?? "N/A"}</Text>
      <Text>Health score: {data?.healthScore ?? "N/A"}</Text>
    </View>
  );
};

export default AboutTab;
