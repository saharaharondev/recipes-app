import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./PopularRecipes.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularRecipeCard";
import useFetch from "../../../hook/useFetch";

const PopularRecipes = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("recipes/random", {
    number: '10'
  });

  const recipes = data?.recipes ?? []; 
  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/recipes/${item.id}`);
    setSelectedJob(item.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Recipes</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={recipes}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.id.toString()} // Ensure id is a string
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default PopularRecipes;
