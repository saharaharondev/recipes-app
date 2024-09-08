import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from './myRecipes.styles';
import { COLORS } from "../../../constants";

const ShoppingList = ({ shoppingList, optimizedShoppingList, isGenerating }) => {
    return (
        <View>
            <Text style={styles.headerTitle}>Shopping List</Text>
            {shoppingList.map((item, index) => (
                <Text key={index} style={styles.item}>
                    {item.name} (for {item.recipeTitle}): {item.quantity} {item.unit}
                </Text>
            ))}

            <Text style={styles.headerTitle}>Optimized Shopping List</Text>
            {isGenerating ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
                <Text style={styles.item}>
                    {optimizedShoppingList}
                </Text>
            )}
        </View>
    );
};

export default ShoppingList;
