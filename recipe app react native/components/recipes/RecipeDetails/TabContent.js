import React from 'react';
import { View, Text, FlatList, CheckBox, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../../styles/recipes';

const TabContent = ({
  activeTab,
  data,
  ingredients,
  isEditingIngredients,
  toggleSelect,
  handleAddIngredient,
  handleRemoveSelected,
  handleDoneEditing,
  newIngredient,
  setNewIngredient,
  newAmount,
  setNewAmount,
  newUnit,
  setNewUnit,
  setIsEditingIngredients, // Added setIsEditingIngredients as a prop
}) => {
  switch (activeTab) {
    case "Ingredients":
      return isEditingIngredients ? (
        <View style={styles.editContainer}>
          <FlatList
            data={ingredients}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.ingredientRow}>
                <CheckBox
                  value={item.selected}
                  onValueChange={() => toggleSelect(item.id)}
                />
                <Text style={styles.ingredientText}>{item.name} - {item.amount} {item.unit}</Text>
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
          {ingredients.length ? (
            ingredients.map((ingredient, index) => (
              <Text key={index} style={{ marginBottom: 5 }}>
                {ingredient.name} - {ingredient.amount} {ingredient.unit}
              </Text>
            ))
          ) : (
            <Text>No ingredients available.</Text>
          )}
          {/* Conditionally render Edit button when not editing */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditingIngredients(true)} // Switch to editing mode
          >
            <Text style={styles.buttonText}>Edit Ingredients</Text>
          </TouchableOpacity>
        </View>
      );
    case "About":
      return (
        <View>
          <Text>{data?.summary?.replace(/<\/?[^>]+(>|$)/g, "") || "No summary available."}</Text>
          <Text>Ready in: {data?.readyInMinutes ?? "N/A"} minutes</Text>
          <Text>Servings: {data?.servings ?? "N/A"}</Text>
          <Text>Price per serving: ${data?.pricePerServing?.toFixed(2) ?? "N/A"}</Text>
          <Text>Health score: {data?.healthScore ?? "N/A"}</Text>
        </View>
      );
    case "Instructions":
      return (
        <View>
          {data?.instructions ? (
            <Text>{data.instructions.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
          ) : (
            <Text>No instructions available.</Text>
          )}
        </View>
      );
    default:
      return null;
  }
};

export default TabContent;
