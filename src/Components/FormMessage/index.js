import { useTheme, Banner, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default ({ visible, text, level, onPress }) => {
    const theme = useTheme();

    const getColor = () => {
        switch (level) {
            case 'error':
                return theme.colors.error
            case 'success':
                return theme.colors.success
            default:
                return theme.colors.black
        }
    }

    return (
        <Banner
            visible={visible}
            actions={[{ label: 'Ok', onPress, textColor: theme.colors.white }]}
            style={styles.banner(getColor())}
        >
            <Text style={styles.text(theme)}>{text}</Text>
        </Banner>
    );
}

const styles = StyleSheet.create({
    banner: color => ({ backgroundColor: color }),
    text: theme => ({ color: theme.colors.white })
});