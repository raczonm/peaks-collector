import { useSelector } from 'react-redux';
import { useTheme, Text, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styleHelpers from '../../../../Helpers/styleHelpers';

export default () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const { avatarUrl, name } = useSelector(state => state.account.info); // Different values will be used
    
    const handleRecordPress = () => navigation.navigate('Activity');

    return (
        <View style={styleHelpers.horizontalWrapper}>  
            <MaterialCommunityIcons name="hiking" color={theme.colors.white} size={50} />
            <View style={styles.contentWrapper(theme)}>
                <Text style={styles.actionLabel(theme)}>
                    You have already recorder 
                    <Text style={styleHelpers.strongText(theme, theme.colors.white)}> 10 </Text>
                    activities, would You like to start new one?
                </Text>
                <Button mode="contained" onPress={handleRecordPress} labelStyle={styles.recordButtonText(theme)} style={styles.recordButton(theme)}>Start Recording!</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentWrapper: theme => ({
        borderLeftWidth: 1,
        borderColor: theme.colors.white80,
        paddingLeft: 20,
        marginLeft: 20,
        paddingRight: 10,
        flexGrow: 1,
        flexShrink: 1
    }),
    actionLabel: theme => ({
        fontSize: 14,
        marginLeft: 10,
        margiRight: 50,
        color: theme.colors.white
    }),
    recordButton: theme => ({
        backgroundColor: theme.colors.white,
        marginLeft: 10,
        marginTop: 10,
    }),
    recordButtonText: theme => ({
        color: theme.colors.primary,
        fontWeight: 'bold'
    })
})