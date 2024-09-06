import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    editContainer: {
      marginTop: 20,
    },
    ingredientRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    ingredientText: {
      marginLeft: 10,
    },
    input: {
      borderColor: COLORS.gray,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
    },
    addButton: {
      backgroundColor: COLORS.green,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 5,
    },
    removeButton: {
      backgroundColor: COLORS.red,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 5,
    },
    doneButton: {
      backgroundColor: COLORS.blue,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 5,
    },
    saveButton: {
      backgroundColor: COLORS.primary,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    editButton: {
      backgroundColor: COLORS.primary,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: COLORS.white,
      fontWeight: 'bold',
    },
    saveStatus: {
      color: COLORS.primary,
      marginTop: 20,
      textAlign: 'center',
    },
  });

  export default styles;