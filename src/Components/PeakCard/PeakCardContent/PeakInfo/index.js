import { Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default ({ peak }) => {
    return (
        <View style={styles.infoWrapper}>
            <Text variant="titleLarge">{peak.name} - {peak.elevation}m</Text>
            <Text variant="bodyMedium">Poland, małopolska</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    infoWrapper: {
        padding: 10,
        paddingRight: 110
    },
})