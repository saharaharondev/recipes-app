import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, View, TouchableOpacity, Text } from 'react-native';
import { Stack, useRouter, useSearchParams } from "expo-router";
import { ScreenHeaderBtn } from "../../components";
import { COLORS, icons } from "../../constants";
import useFetch from "../../hook/useFetch";
import Tabs from "../../components/recipes/RecipeDetails/Tabs";
import TabContent from "../../components/recipes/RecipeDetails/TabContent/TabContent";
import RecipeInfo from "../../components/recipes/RecipeDetails/RecipeInfo";
import { handleSaveRecipe } from "../../services/recipes";
import styles from '../../styles/recipes'; 

const tabs = ["About", "Ingredients", "Instructions"];
const RecipeDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch(`recipes/${params.id}/information`);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    if (data?.extendedIngredients) {
      setIngredients(data.extendedIngredients.map(ingredient => ({
        id: ingredient.id,
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
        selected: false
      })));
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.left} dimension="60%" handlePress={() => router.back()} />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong: {error.message}</Text>
          ) : data ? (
            <View style={{ padding: 20 }}>
              <RecipeInfo data={data} />
              <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabContent
                activeTab={activeTab}
                data={data}
                ingredients={ingredients}
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleSaveRecipe(data, ingredients, setSaveStatus)}
              >
                <Text style={styles.buttonText}>Save Recipe</Text>
              </TouchableOpacity>
              <Text>{saveStatus}</Text>
            </View>
          ) : null}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default RecipeDetails;
