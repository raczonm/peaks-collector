import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export default ({ children }) => {
    const theme = useTheme();

    return (
        <View style={styles.box(theme)}>{children}</View>
    );
};

const styles = StyleSheet.create({
    box: theme => ({
        width: '100%',
        borderBottomWidth: 1,
        borderColor: theme.colors.darkGray,
        paddingBottom: 20,
        marginBottom: 20
    })
})