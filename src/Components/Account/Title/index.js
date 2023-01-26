import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default ({ children }) => {
    return <Text variant="titleLarge" style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginBottom: 20
    }
});