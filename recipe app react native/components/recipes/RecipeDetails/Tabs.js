import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={{ marginTop: SIZES.medium }}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab)}
          style={{
            marginBottom: SIZES.small,
            padding: SIZES.small,
            backgroundColor: activeTab === tab ? COLORS.primary : COLORS.lightWhite,
            borderRadius: SIZES.small,
          }}
        >
          <Text style={{ color: activeTab === tab ? COLORS.white : COLORS.primary }}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Tabs;
