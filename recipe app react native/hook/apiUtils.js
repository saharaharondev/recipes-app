import axios from 'axios';

export const generateShoppingListWithGPT = async (shoppingList, setOptimizedShoppingList, setIsGenerating, setError) => {
    setIsGenerating(true);
    const formattedList = shoppingList.map(item => 
        `${item.name}: ${item.quantity} ${item.unit} (for ${item.recipeTitle})`
    ).join(', ');

    try {
        const response = await axios.post('https://chatgpt-42.p.rapidapi.com/gpt4', {
            messages: [
                {
                    role: 'user',
                    content: `I have a shopping list. Please make the following changes and return only the new optimized shopping list:
                    
                    1. Standardize Ingredient Names:
                        - Normalize variations in ingredient names to a common name.
                        - Group similar ingredients together.
                    
                    2. Sum Up Quantities:
                        - Add up the quantities for the same ingredient across different recipes.
                        - Ensure the units are consistent (e.g., cups, ounces, teaspoons).
                    
                    3. Format the Output:
                        - Use the format: <item> <amount> <for what>. For items with variations (e.g., "whole eggs or 8 egg yolks"), choose the most common variant or note the variations in parentheses.
                        - If the unit for an ingredient varies (e.g., "1 cup" vs. "16 oz"), convert to a consistent unit.
                    
                    Here is my shopping list: ${formattedList}`
                }
            ],
            web_access: false
        }, {
            headers: {
                'x-rapidapi-key': '<your key>',
                'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        });

        setOptimizedShoppingList(response.data.result || 'No response from API');
    } catch (error) {
        setError('Failed to generate optimized shopping list.');
    }

    setIsGenerating(false);
};
