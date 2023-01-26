import { useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({ height = 200, iconSize = 200 }) => {
    const theme = useTheme();

    return <View style={styles.imagePlaceholder(theme, height,)}>
        <MaterialCommunityIcons name='image-filter-hdr' color={theme.colors.darkGray} size={iconSize} style={styles.imagePlaceholderIcon} />
    </View>;
};

const styles = StyleSheet.create({
    imagePlaceholder: (theme, height) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height,
        backgroundColor: theme.colors.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }),
    imagePlaceholderIcon: {
        alignSelf: 'center'
    }
});