import React from 'react';
import { View, Text } from 'react-native';

const InstructionsTab = ({ data }) => {
  return (
    <View>
      {data?.instructions ? (
        <Text>{data.instructions.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
      ) : (
        <Text>No instructions available.</Text>
      )}
    </View>
  );
};

export default InstructionsTab;
