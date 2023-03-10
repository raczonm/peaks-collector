import { ActivityIndicator, useTheme } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

export default ({ visible, query }) => {
    const theme = useTheme();

    return <View style={styles.spinnerWrapper(visible, theme)}>
        <ActivityIndicator animating={true} size={100} />
        <Text variant="titleLarge" style={styles.spinnerText}>
            Searching for
            <Text style={styles.spinnerTextQuery(theme)}> {query}</Text>
        </Text>
    </View>
};

const styles = StyleSheet.create({
    spinnerWrapper: (visible, theme) => ({
        display: visible ? 'block' : 'none',
        position: 'absolute',
        zIndex: 1,
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        backgroundColor: theme.colors.white80,
        height: '100%',
        width: '100%',
        paddingTop: 50
    }),
    spinnerText: {
        textAlign: 'center',
        marginTop: 30
    },
    spinnerTextQuery: theme => ({
        color: theme.colors.primary,
        fontWeight: 'bold'
    })
});