import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
    recipeCard: {
        marginBottom: SIZES.medium,
        borderRadius: SIZES.radius,
        overflow: 'hidden',
        width: '60%', 
        justifyContent: 'flex-end',
    },
    imageBackground: {
        width: '100%', 
        height: 200,   
        justifyContent: 'flex-end',
    },
    image: {
        width: '100%', 
        height: '100%', 
        borderRadius: SIZES.radius,
    },
    title: {
        color: COLORS.white,
        fontSize: SIZES.large,
        fontWeight: 'bold',
        padding: SIZES.small,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        width: '100%', 
    },
    selectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.small,
        position: 'absolute', 
        bottom: 0, 
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    },
    label: {
        marginLeft: SIZES.small,
    },
    input: {
        marginLeft: SIZES.small,
        padding: SIZES.small,
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        width: 80, 
        textAlign: 'center',
    },
});

export default styles;
