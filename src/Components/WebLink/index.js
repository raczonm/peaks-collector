import { A } from '@expo/html-elements';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export default props => {
    const theme = useTheme();

    return <A {...props} style={[styles.link(theme), props.style]}>{props.children}</A>
}

const styles = StyleSheet.create({
    link: theme => ({
        color: theme.colors.primary,
        fontWeight: 'bold'
    })
})

