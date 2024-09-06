import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { COLORS } from "../../../constants";
import MyRecipeCard from "../../common/cards/myRecipe/MyRecipeCard";
import ShoppingList from "./ShoppingList";
import { fetchRecipes, buildShoppingList } from "../../../services/recipes";
import { generateShoppingListWithGPT } from "../../../hook/apiUtils";
import styles from './myRecipes.styles';

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRecipes, setSelectedRecipes] = useState({});
    const [amounts, setAmounts] = useState({});
    const [optimizedShoppingList, setOptimizedShoppingList] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        fetchRecipes(setRecipes, setIsLoading, setError);
    }, []);

    const handleSelectRecipe = (id) => {
        setSelectedRecipes(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleAmountChange = (id, value) => {
        setAmounts(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const generateShoppingList = () => {
        const shoppingList = buildShoppingList(recipes, selectedRecipes, amounts);
        generateShoppingListWithGPT(shoppingList, setOptimizedShoppingList, setIsGenerating, setError);
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color={COLORS.primary} />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Recipes</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={recipes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MyRecipeCard
                        item={item}
                        selected={selectedRecipes[item.id]}
                        handleSelectRecipe={handleSelectRecipe}
                        handleAmountChange={handleAmountChange}
                        amount={amounts[item.id]}
                    />
                )}
                ListEmptyComponent={<Text>No recipes available</Text>}
                ListFooterComponent={
                    <ShoppingList 
                        shoppingList={buildShoppingList(recipes, selectedRecipes, amounts)}
                        optimizedShoppingList={optimizedShoppingList}
                        isGenerating={isGenerating}
                    />
                }
            />
<TouchableOpacity style={styles.button} onPress={generateShoppingList}>
    <Text style={styles.buttonText}>Generate Optimized Shopping List</Text>
</TouchableOpacity>
        </View>
    );
};

export default MyRecipes;
