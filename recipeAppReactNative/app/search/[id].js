import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View, Image, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import axios from 'axios';
import { RAPIDAPI_KEY } from '@env'; 

import { ScreenHeaderBtn } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import styles from '../../styles/search'; 
import RecipeCard from '../../components/common/cards/recipe/RecipeCard';
const RecipeSearch = () => {
    const params = useSearchParams();
    const router = useRouter();

    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedRecipe, setSelectedRecipe] = useState(null); 

    const handleSearch = async () => {
        setSearchLoader(true);
        setSearchResult([]);

        try {
            const options = {
                method: "GET",
                url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
                },
                params: {
                    query: params.id,
                    number: '10',
                    offset: (page - 1) * 10,
                },
            };

            const response = await axios.request(options);
            setSearchResult(response.data.results);
        } catch (error) {
            setSearchError(error);
            console.log(error);
        } finally {
            setSearchLoader(false);
        }
    };

    const handlePagination = (direction) => {
        if (direction === 'left' && page > 1) {
            setPage(page - 1);
        } else if (direction === 'right') {
            setPage(page + 1);
        }
    };

    const handleCardPress = (recipe) => {
        setSelectedRecipe(recipe);
        router.push(`/recipes/${recipe.id}`);
    };

    useEffect(() => {
        handleSearch();
    }, [page]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: "",
                }}
            />

            <FlatList
                data={searchResult}
                renderItem={({ item }) => (
                    <RecipeCard
                        item={item}
                        selectedRecipe={selectedRecipe}
                        handleCardPress={handleCardPress}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params.id}</Text>
                            <Text style={styles.noOfSearchedJobs}>Recipe Results</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {searchLoader ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : searchError && (
                                <Text>Oops something went wrong</Text>
                            )}
                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('left')}
                        >
                            <Image
                                source={icons.chevronLeft}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{page}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('right')}
                        >
                            <Image
                                source={icons.chevronRight}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default RecipeSearch;
