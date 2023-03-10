import { useTheme } from 'react-native-paper';
import { StyleSheet, View, Dimensions } from 'react-native';

export default ({ children }) => {
    const theme = useTheme();

    return (
        <View style={styles.modalOverlay(theme)}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    modalOverlay: theme => ({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.white80,
        height: Dimensions.get('window').height,
        width: '100%'
    })
});