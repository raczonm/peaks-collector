import { Button, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';


export default ({ onPress, text }) => {
    const theme = useTheme();

    return <Button mode="contained" style={styles.saveButton(theme)} onPress={onPress}>{text}</Button>;
};

const styles = StyleSheet.create({
    saveButton: theme => ({
        backgroundColor: theme.colors.success,
        paddingVertical: 10,
        marginTop: 20
    })
});