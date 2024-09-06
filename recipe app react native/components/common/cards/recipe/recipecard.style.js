
import { StyleSheet } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: (selectedRecipe, recipe) => ({
    borderRadius: SIZES.medium,
    overflow: 'hidden',
    borderWidth: selectedRecipe?.id === recipe.id ? 2 : 0,
    borderColor: COLORS.primary,
  }),
  backgroundImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  contentContainer: {
    padding: SIZES.medium,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  recipeTitle: (selectedRecipe, recipe) => ({
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
    textAlign: 'center',
  }),
  recipeSource: (selectedRecipe, recipe) => ({
    color: COLORS.white,
    fontSize: SIZES.small,
    textAlign: 'center',
  }),
});

export default styles;
