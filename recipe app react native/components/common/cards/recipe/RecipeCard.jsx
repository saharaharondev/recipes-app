import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './recipecard.style';
import { checkImageURL } from '../../../../utils';
import useFetch from "../../../../hook/useFetch";

const RecipeCard = ({ item, selectedRecipe, handleCardPress }) => {
    const { data: recipe, isLoading, error, refetch } = useFetch(`recipes/${item.id}/information`);

    // Show a loading indicator or error message if necessary
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error loading recipe information</Text>;
    }

    return (
        <TouchableOpacity
            style={styles.container(selectedRecipe, recipe)}
            onPress={() => handleCardPress(recipe)}
        >
            <ImageBackground
                source={{
                    uri: checkImageURL(recipe?.image)
                        ? recipe.image
                        : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg',
                }}
                style={styles.backgroundImage}
                imageStyle={{ borderRadius: 10 }}
            >
                <View style={styles.overlay} />
                
                <View style={styles.contentContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.recipeTitle(selectedRecipe, recipe)} numberOfLines={1}>
                            {recipe?.title}
                        </Text>
                        <View style={styles.infoWrapper}>
                            <Text style={styles.recipeSource(selectedRecipe, recipe)}>
                                {recipe?.sourceName}
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default RecipeCard;
