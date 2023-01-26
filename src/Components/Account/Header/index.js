import { Image, StyleSheet, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

import logo from '../../../Assets/logo2.png';

export default () => {
    const theme = useTheme();

    return (
        <View style={styles.header(theme)}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.quote(theme)}variant="titleSmall">“The mountains are calling, and I must go.”</Text>
            <Text style={styles.author(theme)}variant="bodySmall">~John Muir</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: theme =>({
        backgroundColor: theme.colors.primary,
    }),
    logo: {
        width: 150,
        height: 110,
        marginTop: 60,
        marginBottom: 10,
        alignSelf: 'center',
        tintColor: 'white'
    },
    quote: theme => ({
        textAlign: 'center',
        margin: 20,
        marginBottom: 0,
        color: theme.colors.white,
        fontWeight: 'bold'
    }),
    author: theme => ({
        textAlign: 'center',
        margin: 20,
        marginTop: 5,
        marginBottom: 30,
        color: theme.colors.white
    })
})