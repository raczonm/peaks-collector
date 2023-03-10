
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default ({ onPress, backgroundColor, children, size = 220 }) => {
    const theme = useTheme();

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.buttonOuter(theme, backgroundColor, size)}>
                <View style={styles.buttonInner(theme, size)}>
                    <Text style={styles.buttonText(theme, size)}>{children}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonOuter: (theme, backgroundColor, size) => ({
        width: size,
        height: size,
        padding: 10,
        backgroundColor: backgroundColor || theme.colors.primary,
        borderRadius: size / 2,
        marginTop: - size / 2
    }),
    buttonInner: (theme, size) => ({
        width: '100%',
        height: '100%',
        borderWidth: 5,
        borderColor: theme.colors.white,
        borderRadius: '100%',
        justifyContent: 'center'
    }),
    buttonText: (theme, size) => ({
        color: theme.colors.white,
        textAlign: 'center',
        fontSize: size / 8 ,
        fontWeight: 'bold'
    })
});