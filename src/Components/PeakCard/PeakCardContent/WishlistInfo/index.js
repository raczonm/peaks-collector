import { useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default () => {
    const theme = useTheme();

    return (
        <View style={styles.wishlistInfo(theme)}>
            <MaterialCommunityIcons name="star" color={theme.colors.white} size={18} />
        </View>
    );
}


const styles = StyleSheet.create({
    wishlistInfo: theme => ({
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: theme.colors.wishlist,
        padding: 5,
        paddingLeft: 7,
        zIndex: 2
    }),
})