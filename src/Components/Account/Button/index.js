import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';


export default ({ text, mode, onPress, marginTop = 0 }) => {
    const theme = useTheme();

    return (
        <Button style={styles.button(theme, marginTop)} onPress={onPress} mode={mode}>
            {text}
        </Button>
    );
};

const styles = StyleSheet.create({
    button: (theme, marginTop) => ({
        paddingVertical: 5,
        marginTop,
        borderColor: theme.colors.primary,
    }),
})