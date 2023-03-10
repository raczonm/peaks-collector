import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import styleHelpers from '../../../../Helpers/styleHelpers';
import Avatar from '../../../Avatar';

export default () => {
    const { avatarUrl, name } = useSelector(state => state.account.info);

    return (
        <View style={styleHelpers.horizontalWrapper}>  
            <Avatar size={80} avatarUrl={avatarUrl} />
            <View style={styles.info}>
                <Text style={styles.welcomeBack}>Welcome back</Text>
                <Text style={styles.userName}>{name}</Text>
                <Text style={styles.subtitle}>Are You ready for new adventures?</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    welcomeBack: {
        fontSize: 14
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 12,
        marginTop: 10
    },
    info: {
        flexGrow: 2,
        paddingLeft: 10
    }
})