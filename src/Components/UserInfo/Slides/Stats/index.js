import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { useTheme, Text, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styleHelpers from '../../../../Helpers/styleHelpers';

export default ({ duration }) => {
    const theme = useTheme();
    const { avatarUrl, name } = useSelector(state => state.account.info); // Different values will be used

    return (
        <View style={styleHelpers.horizontalWrapper}>  
            <MaterialCommunityIcons name="chart-line" color={theme.colors.primary} size={50} />
            <View style={styles.contentWrapper(theme)}>
                <Text style={styles.label}>
                    Last {duration} days statistics
                </Text>
                <View style={styleHelpers.horizontalWrapper}>
                    <View style={styles.item(theme)}>
                        <Text style={styles.itemValue(theme)}>7</Text>
                        <Text style={styles.itemLabel}>Peaks conquered</Text>
                    </View>
                    <View style={styles.item(theme, theme.colors.wishlist)}>
                        <Text style={styles.itemValue(theme, theme.colors.wishlist)}>3</Text>
                        <Text style={styles.itemLabel}>Activities Recorded</Text>
                    </View>
                    <View style={styles.item(theme, theme.colors.success)}>
                        <Text style={styles.itemValue(theme, theme.colors.success)}>11</Text>
                        <Text style={styles.itemLabel}>Achievemetns unlocked</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentWrapper: theme => ({
        borderLeftWidth: 1,
        borderColor: theme.colors.lightGray,
        paddingLeft: 20,
        marginLeft: 20,
        flexGrow: 1,
        flexShrink: 1
    }),
    label: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    item: (theme, color) => ({
        marginRight: 10,
        maxWidth: 80,
        borderWidth: 1,
        borderColor: color || theme.colors.primary,
        padding: 5,
        paddingHorizontal: 10
    }),
    itemValue: (theme, color) => ({
        fontSize: 20,
        fontWeight: 'bold',
        color: color || theme.colors.primary,
        textAlign: 'center'
    }),
    itemLabel: {
        marginTop: 2,
        fontSize: 8,
        height: 20,
        textAlign: 'center'
    }
})