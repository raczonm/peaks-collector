import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Linking } from 'react-native';
import { Button, useTheme, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Constants from 'expo-constants';

import Avatar from '../Avatar';
import { logoutRequest } from '../../Store/actions';


export default props => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { isRegistered, info: { avatarUrl, name, email }} = useSelector(state => state.account);

    const handleLogout = () => dispatch(logoutRequest());

    const handleReportBug = () => {
        const subject = `${email} - User Feedback`;
        const body = `App version ${Constants.manifest.version}`;
        Linking.openURL(`mailto:support@peaks-collector.com?subject=${subject}&body=${body}`);
    };

    return <DrawerContentScrollView>
        <View style={styles.header}>
            <Avatar size={200} avatarUrl={avatarUrl} />
            <Text variant="headlineSmall" style={styles.name}>{name}</Text>
            {!isRegistered && <>
                <Text variant="bodySmall" style={styles.unregisteredInfo}>You are not registered user yet!</Text>
                <Text variant="bodySmall" style={styles.unregisteredInfo}>Please create profile by clicking link below, otherwise all Your data will be stored on Your device only and can be easly lost.</Text>
            </>}
        </View>
        <View style={styles.menu(theme)}>
            <DrawerItemList {...props} />
            <DrawerItem
                onPress={handleReportBug}
                label="Report bug / Share feedback"
                style={styles.menuItem}
                labelStyle={styles.menuItemLabel}
            />
        </View>
        <View style={styles.footer}>
            <Button mode="contained" style={styles.logoutButton} onPress={handleLogout}>Logout</Button>
            <Text style={styles.version} variant="bodySmall">App {Constants.manifest.version}</Text>
        </View>
    </DrawerContentScrollView>;
};

const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'center'
    },
    unregisteredInfo: {
        padding: 10,
        paddingTop: 0,
        textAlign: 'center'
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
    menuItem: { marginBottom: 0, marginTop: 0 },
    menuItemLabel: { textAlign: 'center', marginRight: -32 },
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
