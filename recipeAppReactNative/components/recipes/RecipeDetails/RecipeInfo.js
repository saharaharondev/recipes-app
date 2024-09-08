import React from 'react';
import { View, Image, Text } from 'react-native';
import { SIZES } from '../../../constants';

const RecipeInfo = ({ data }) => {
  return (
    <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
      <Image
        source={{ uri: data.image }}
        style={{
          width: "100%",
          height: 200,
          borderRadius: SIZES.small,
        }}
      />
      <Text style={{ fontSize: SIZES.large, fontWeight: "bold", marginTop: SIZES.medium }}>
        {data.title ?? "No title available"}
      </Text>
    </View>
  );
};

export default RecipeInfo;
