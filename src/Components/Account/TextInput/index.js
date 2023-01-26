import { useState, useEffect } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default ({ onChange, label, icon, isSecure = false }) => {
    const theme = useTheme();
    const [value, setValue] = useState('');

    useEffect(() => { onChange(value); }, [value])

    return (
        <TextInput
            label={label}
            value={value}
            onChangeText={text => setValue(text)}
            style={styles.input(theme)}
            underlineColor={theme.colors.darkGray}
            left={<TextInput.Icon icon={icon} color={isTextInputFocused => isTextInputFocused ? theme.colors.primary : null} />}
            secureTextEntry={isSecure}
        />
    );
};

const styles = StyleSheet.create({
    input: theme => ({
        backgroundColor: theme.colors.white,
    })
});