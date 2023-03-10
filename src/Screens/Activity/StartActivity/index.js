
import { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button, IconButton, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import MapView from 'react-native-maps';

import CircleButton from '../../../Components/CircleButton';
import { DEFAULT_ACTIVITY_MAP_DELTA } from '../../../Config';
import { startActivity } from '../../../Store/actions';

export default ({ currentUserPosition, navigation }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const handleStartActivity = () => {
        dispatch(startActivity());
        // should fetchPeaks
    }

    const handleCloseActivity = () => navigation.navigate('Main');

    return (
        <View style={styles.wrapper}>
            <MapView
                showsUserLocation={true}
                initialRegion={{
                    ...currentUserPosition,
                    latitudeDelta: DEFAULT_ACTIVITY_MAP_DELTA,
                    longitudeDelta: DEFAULT_ACTIVITY_MAP_DELTA
                }}
                style={styles.map}
            />
             <IconButton icon="close" mode="contained" onPress={handleCloseActivity} iconColor={theme.colors.primary} size={30} style={styles.closeIconButton(theme)} />
            <View style={styles.separator(theme)} />
            <CircleButton onPress={handleStartActivity}>START</CircleButton>
            <Text variant="bodyMedium" style={styles.description(theme)}>Lorem ipsum dolor sit amet, conseetur adipisca ajeaj asding elit. Proin felis nisl, condimentum a mauris nec, placerat pellentesque mi. Suspendisse potenti. Fusce sit amet elementum lacus, in auctor orci.</Text>
            <Button mode="outlined" outlineColor={theme.colors.primary} style={styles.closeButton(theme)} onPress={handleCloseActivity}>Close Activity Screen</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    separator: theme => ({
        width: '100%',
        height: 5,
        backgroundColor: theme.colors.primary
    }),
    map:  {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 350
    },
    description: theme => ({
        margin: 20,
        textAlign: 'center',
        color: theme.colors.darkGray
    }),
    closeIconButton: theme => ({
        position: 'absolute',
        backgroundColor: theme.colors.white90,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        right: 5,
        top: 35
    }),
    closeButton: theme => ({
        borderColor: theme.colors.primary
    })
});