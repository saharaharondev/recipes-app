import axios from 'axios';

export const handleSaveRecipe = async (data, ingredients, setSaveStatus) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/save-recipe', {
      title: data.title,
      image: data.image,
      summary: data.summary,
      ingredients: ingredients.map(ingredient => ({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit
      })),
      instructions: data.instructions,
      servings: data.servings,
    });

    setSaveStatus('Recipe saved successfully!');
  } catch (error) {
    setSaveStatus(`Failed to save recipe: ${error.response ? error.response.data.detail : error.message}`);
  }
};

export const fetchRecipes = async (setRecipes, setIsLoading, setError) => {
  try {
      const response = await axios.get('http://127.0.0.1:8000/recipes/');
      setRecipes(response.data.recipes);
  } catch (error) {
      setError(error.message || 'Failed to fetch recipes');
  }
  setIsLoading(false);
};

export const buildShoppingList = (recipes, selectedRecipes, amounts) => {
  let shoppingList = [];

  recipes.forEach(recipe => {
      if (selectedRecipes[recipe.id]) {
          const amount = amounts[recipe.id] || 1;
          const ingredients = recipe.ingredients || [];
          ingredients.forEach(ingredient => {
              shoppingList.push({ 
                  name: ingredient.name,
                  quantity: amount * ingredient.amount,
                  unit: ingredient.unit || '',
                  recipeTitle: recipe.title
              });
          });
      }
  });

  return shoppingList;
};