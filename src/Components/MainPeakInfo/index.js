import { useTheme, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default ({ peak, padding = 0, isOnMap }) => {
    const theme = useTheme();

    return (
        <View style={styles.wrapper(padding)}>
            <Text variant="titleLarge">{peak.name}</Text>
            {/* <Text variant="bodyMedium">{peak.country}, {peak.region}</Text> */}
            <Text variant="bodyMedium">Poland, małopolska</Text>
            <Text style={styles.elevation(theme, padding, isOnMap)}>
                <Text variant="headlineLarge" style={styles.elevationText(theme)}>{peak.elevation}</Text>
                <Text variant="bodyLarge" style={styles.elevationText(theme)}>m</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: padding => ({
        width: '100%',
        position: 'relative',
        padding,
        paddingRight: 110
    }),
    elevation: (theme, padding, isOnMap) => ({
        position: 'absolute',
        padding: 10,
        paddingLeft: 15,
        paddingVertical: 2,
        backgroundColor: theme.colors.primary,
        fontColor: theme.colors.white,
        top: padding,
        right: isOnMap ? padding : padding - 10,
        textWrap: 'nowrap'
    }),
    elevationText: theme => ({
        color: theme.colors.white
    })
});