// components/MyRecipes/MyRecipes.jsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { supabase } from '../../supabaseClient'; // Make sure to set up supabaseClient.js
import RecipeCard from '../common/cards/recipe/RecipeCard';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*');

      if (error) {
        console.log('Error fetching recipes:', error);
      } else {
        setRecipes(data);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={recipes}
      renderItem={({ item }) => (
        <RecipeCard recipe={item} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default MyRecipes;
