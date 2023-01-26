import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default ({ children }) => {
    return (
        <Text variant="bodySmall" style={styles.description}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    description: {
        textAlign: 'center',
        marginBottom: 20
    }
})