import { useTheme, IconButton } from 'react-native-paper';

export default ({ icon, onPress, bottomPosition, isActive = false }) => {
    const theme = useTheme();

    return (
        <IconButton
            icon={icon}
            mode="contained"
            onPress={onPress}
            size={30}
            iconColor={isActive ? theme.colors.white : theme.colors.primary}
            style={{
                position: 'absolute',
                backgroundColor: isActive ? theme.colors.primary : 'rgba(255, 255, 255, 0.9)',
                borderWidth: 1,
                borderColor: theme.colors.primary,
                right: 5,
                margin: 0,
                bottom: bottomPosition
            }}
        />
    );
}