import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../../../styles/recipes';

const EditIngredients = ({ isEditingIngredients, setIsEditingIngredients }) => {
  return (
    !isEditingIngredients && (
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setIsEditingIngredients(true)}
      >
        <Text style={styles.buttonText}>Edit Ingredients</Text>
      </TouchableOpacity>
    )
  );
};

export default EditIngredients;
