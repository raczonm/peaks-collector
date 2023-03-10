import { StyleSheet } from 'react-native';
import { useTheme, Avatar } from 'react-native-paper';

export default ({ avatarUrl, size = 200, color, backgroundColor }) => {
    const theme = useTheme();

    if (avatarUrl) return <Avatar.Image size={size} source={avatarUrl ? { uri: avatarUrl } : null} style={styles.avatar(theme)} />;

    return <Avatar.Icon size={size} icon="account" style={styles.avatar(theme, backgroundColor)} color={color} />
};

const styles = StyleSheet.create({
    avatar: (theme, backgroundColor) => ({
        marginHorizontal: 'auto',
        backgroundColor: backgroundColor || theme.colors.lightGray,
    }),
})
