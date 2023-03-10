import { useTheme, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import ImagePlaceholder from '../../ImagePlaceholder';

export default () => {
    const theme = useTheme();

    return <View style={styles.wrapper(theme)}>
        <ImagePlaceholder height={190} />
        <View style={styles.loadingTextWrapper(theme)}>
            <Text variant="titleLarge">Loading peak info...</Text>
        </View>
    </View>;
};

const styles = StyleSheet.create({
    wrapper: theme =>({
        position: 'relative',
        height: 252,
        borderWidth: 1,
        borderColor: theme.colors.lightGray,
        marginBottom: 5,
    }),
    loadingTextWrapper: theme => ({
        width: '100%',
        position: 'absolute',
        height: 65,
        backgroundColor: theme.colors.white80,
        padding: 10,
        bottom: 1
    }),
});