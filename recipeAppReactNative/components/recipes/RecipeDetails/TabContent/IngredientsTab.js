import React, { useState } from 'react';
import { View, Text, FlatList, CheckBox, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../../../styles/recipes';

const IngredientsTab = ({ ingredients }) => {
  // Local state for managing the new ingredient input fields and editing mode
  const [newIngredient, setNewIngredient] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newUnit, setNewUnit] = useState('');
  const [isEditingIngredients, setIsEditingIngredients] = useState(false);
  const [ingredientList, setIngredients] = useState(ingredients);

  // Toggle selection for removing ingredients
  const toggleSelect = (id) => {
    setIngredients(
      ingredientList.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, selected: !ingredient.selected } : ingredient
      )
    );
  };

  // Add a new ingredient to the list
  const handleAddIngredient = () => {
    if (newIngredient && newAmount && newUnit) {
      setIngredients([
        ...ingredientList,
        {
          id: Date.now().toString(),
          name: newIngredient,
          amount: newAmount,
          unit: newUnit,
          selected: false,
        },
      ]);
      setNewIngredient('');
      setNewAmount('');
      setNewUnit('');
    }
  };

  // Remove selected ingredients
  const handleRemoveSelected = () => {
    setIngredients(ingredientList.filter((ingredient) => !ingredient.selected));
  };

  // Stop editing
  const handleDoneEditing = () => {
    setIsEditingIngredients(false);
  };

  return isEditingIngredients ? (
    <View style={styles.editContainer}>
      <FlatList
        data={ingredientList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ingredientRow}>
            <CheckBox value={item.selected} onValueChange={() => toggleSelect(item.id)} />
            <Text style={styles.ingredientText}>
              {item.name} - {item.amount} {item.unit}
            </Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Add new ingredient"
        value={newIngredient}
        onChangeText={setNewIngredient}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={newAmount}
        onChangeText={setNewAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Unit"
        value={newUnit}
        onChangeText={setNewUnit}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.removeButton} onPress={handleRemoveSelected}>
        <Text style={styles.buttonText}>Remove Selected</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.doneButton} onPress={handleDoneEditing}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View>
      {ingredientList.length ? (
        ingredientList.map((ingredient, index) => (
          <Text key={index} style={{ marginBottom: 5 }}>
            {ingredient.name} - {ingredient.amount} {ingredient.unit}
          </Text>
        ))
      ) : (
        <Text>No ingredients available.</Text>
      )}
      <TouchableOpacity style={styles.editButton} onPress={() => setIsEditingIngredients(true)}>
        <Text style={styles.buttonText}>Edit Ingredients</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IngredientsTab;
