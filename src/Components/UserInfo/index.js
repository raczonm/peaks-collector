import { useSelector } from 'react-redux';
import { useTheme, Avatar, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default () => {
    const theme = useTheme();
    const { avatarUrl, name } = useSelector(state => state.account.info);

    return <>
        <View style={styles.wrapper(theme)}>
            <Avatar.Image size={100} source={{ uri: avatarUrl }} />
            <View style={styles.info}>
                <Text variant="titleSmall" style={styles.title}>
                    <Text>Welcome back </Text>
                    <Text style={styles.strongText(theme)}>{name}</Text>
                </Text>
                {/* <Text variant="bodyMedium" style={styles.lineText}>
                    <Text>You have reached </Text>
                    <Text style={styles.strongText(theme)}>{entrances.length}</Text>
                    <Text> peaks!</Text>
                </Text>
                <Text variant="bodyMedium" style={styles.lineText}>
                    <Text>You have visited </Text>
                    <Text style={styles.strongText(theme)}>{entrances.length}</Text>
                    <Text> countries!</Text>
                </Text>
                <Text variant="bodyMedium" style={styles.lineText}>
                    <Text>You have unlocked </Text>
                    <Text style={styles.strongText(theme)}>{achievements.length}</Text>
                    <Text> achievements!</Text>
                </Text> */}
            </View>
        </View>
    </>
}

const styles = StyleSheet.create({
    wrapper: theme => ({
        display: 'flex',
        flexDirection:'row',
        flexWrap: 'no-wrap',
        height: 120,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: theme.colors.lightGray
    }),
    info: {
        flexGrow: 2,
        paddingLeft: 10
    },
    title: { marginBottom: 10 },
    strongText: theme => ({
        fontWeight: 'bold',
        color: theme.colors.primary
    }),
    lineText: {
        marginBottom: 2
    }
})