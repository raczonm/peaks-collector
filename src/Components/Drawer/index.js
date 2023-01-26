import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Button, useTheme, Text, Avatar } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { logoutRequest } from '../../Store/actions';

export default props => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const { isRegistered, info: { avatarUrl, name }} = useSelector(state => state.account );

    const handleLogout = () => dispatch(logoutRequest());

    return <DrawerContentScrollView>
        <View style={styles.header}>
            <Avatar.Image size={200} source={{ uri: avatarUrl }} style={styles.avatar} />
            <Text variant="headlineSmall" style={styles.name}>{name}</Text>
            {!isRegistered && <>
                <Text variant="bodySmall" style={styles.unregisteredInfo(theme)}>You are not registered user yet!</Text>
                <Text variant="bodySmall" style={styles.unregisteredInfo(theme)}>Please create profile by clicking link below, otherwise all Your data will be stored on Your device only and can be easly lost.</Text>
            </>}
        </View>
        <View style={styles.menu(theme)}>
            <DrawerItemList {...props} />
        </View>
        <View style={styles.footer}>
            <Button mode="contained" style={styles.logoutButton} onPress={handleLogout}>Logout</Button>
            <Text style={styles.version} variant="bodySmall">App v1.0.0-alpha.10</Text>
        </View>
    </DrawerContentScrollView>;
};

const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'center'
    },
    unregisteredInfo: theme => ({
        padding: 10,
        paddingTop: 0,
        textAlign: 'center'
    }),
    avatar: {
        marginHorizontal: 'auto',

    },
    name: {
        textAlign: 'center',
        margin: 15
    },
    menu: theme => ({
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: theme.colors.lightGray,
        padding: 10,
        width: '100%'
    }),
    menuItem: {},
    footer: {
        padding: 10,
        marginTop: 20
    },
    logoutButton: {
        marginBottom: 10
    },
    version: {
        textAlign: 'center'
    }
})
