
import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    horizontalWrapper: {
        flexDirection:'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    strongText: (theme, color) => ({
        fontWeight: 'bold',
        color: color || theme.colors.black
    })
})