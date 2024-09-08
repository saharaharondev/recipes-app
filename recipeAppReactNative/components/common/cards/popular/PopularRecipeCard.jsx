import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import styles from "./PopularRecipeCard.style";
import { checkImageURL } from "../../../../utils";

const PopularRecipeCard = ({ item, selectedRecipe, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedRecipe, item)}
      onPress={() => handleCardPress(item)}
    >
      <ImageBackground
        source={{
          uri: checkImageURL(item?.image)
            ? item.image
            : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
        }}
        style={styles.backgroundImage} 
        imageStyle={{ borderRadius: 10 }} 
      >
        <View style={styles.overlay} /> 
        
        <View style={styles.contentContainer}>

          <View style={styles.infoContainer}>
            <Text style={styles.recipeName(selectedRecipe, item)} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.infoWrapper}>
              <Text style={styles.publisher(selectedRecipe, item)}>
                {item?.sourceName} -
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default PopularRecipeCard;
