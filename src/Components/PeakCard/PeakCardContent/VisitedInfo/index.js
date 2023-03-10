import { Text, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({ visitedDate }) => {
    const theme = useTheme();

    return (
        <View style={styles.visitedInfo(theme)}>
            <MaterialCommunityIcons name="calendar" color={theme.colors.white} size={18} />
            <Text variant="bodyMedium" style={styles.visitedText(theme)}>{visitedDate}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    visitedInfo: theme => ({
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        top: 0,
        left: 0,
        backgroundColor: theme.colors.primary,
        paddingVertical: 3,
        paddingRight: 10,
        paddingLeft: 5,
        zIndex: 2
    }),
    visitedText: theme => ({
        color: theme.colors.white,
        fontWeight: 'bold',
        marginLeft: 5,
    }),
})