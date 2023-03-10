import { useTheme, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({ peak }) => {
    const theme = useTheme();

    return (
        <View style={styles.wrapper}>
            <MaterialCommunityIcons name='summit' color={theme.colors.black} size={30} />
            <View style={styles.textWrapper}>
                <Text variant="titleLarge">{peak.name}</Text>
                {/* <Text variant="bodyMedium">{peak.country}, {peak.region}</Text> */}
                <Text variant="bodyMedium">Poland, małopolska</Text>
            </View>
            <View style={styles.elevationWrapper(theme)}>
                <Text style={styles.elevation(theme)}>
                    <Text variant="headlineLarge" style={styles.elevationText(theme)}>{peak.elevation}</Text>
                    <Text variant="bodyLarge" style={styles.elevationText(theme)}>m</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        position: 'relative',
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textWrapper: {
        flexGrow: 1,
        flexShrink: 1,
        marginLeft: 20,
        marginRight: 10
    },
    elevationWrapper: theme => ({
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
    }),
    elevation: theme => ({
        paddingHorizontal: 15,
        paddingVertical: 2,
        fontColor: theme.colors.white,
        textWrap: 'nowrap'
    }),
    elevationText: theme => ({
        color: theme.colors.white
    })
});