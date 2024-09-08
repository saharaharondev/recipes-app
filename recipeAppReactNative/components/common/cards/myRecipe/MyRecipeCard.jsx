import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, CheckBox, TextInput } from "react-native";
import { useRouter } from "expo-router";
import styles from './MyRecipeCard.style';

const MyRecipeCard = ({ item, selected, handleSelectRecipe, handleAmountChange, amount }) => {
    const router = useRouter();

    return (
        <View style={styles.recipeCard}>
            {/* route is not ready yet */}
            <TouchableOpacity onPress={() => router.push(`/recipe-details/${item.id}`)}>
                <ImageBackground 
                    source={{ uri: item.image }} 
                    style={styles.imageBackground} 
                    imageStyle={styles.image}
                >
                    <Text style={styles.title}>{item.title}</Text>
                </ImageBackground>
            </TouchableOpacity>
            <View style={styles.selectionContainer}>
                <CheckBox
                    value={!!selected}
                    onValueChange={() => handleSelectRecipe(item.id)}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Amount"
                    value={amount ? amount.toString() : ''}
                    onChangeText={(value) => handleAmountChange(item.id, parseFloat(value) || 1)}
                />
            </View>
        </View>
    );
};

export default MyRecipeCard;
