import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: (selectedRecipe, item) => ({
    width: 250,
    borderRadius: SIZES.medium,
    overflow: "hidden", 
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  backgroundImage: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end',
  },
  infoContainer: {
    marginTop: SIZES.large,
    paddingHorizontal: SIZES.large,
  },
  recipeName: (selectedRecipe, item) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.white ,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedRecipe, item) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: COLORS.white ,
  }),

  contentContainer: {
    padding: SIZES.medium,
    justifyContent: "space-between",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay for text readability
  },
});

export default styles;
