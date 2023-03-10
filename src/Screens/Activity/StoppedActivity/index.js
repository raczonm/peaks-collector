
import { useEffect, useState } from 'react';
import { ScrollView, View, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import FloatingBox from '../../../Components/FloatingBox';
import { DEFAULT_ACTIVITY_MAP_DELTA } from '../../../Config';
import { cancelActivity } from '../../../Store/actions';
import CircleButton from '../../../Components/CircleButton';
import { getDuration } from '../../../Helpers'

export default ({ currentActivity, currentUserPosition }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const { startTimestamp, stopTimestamp, details, locations } = currentActivity;

    const handleRemoveActivity = () => dispatch(cancelActivity());


    return (
        <View style={styles.outerWrapper(theme)}>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.titleWrapper}>
                        <View>
                            <Text variant="titleLarge">Activity Completed!</Text>
                            <Text variant="bodySmall">Check out details of Your activity below</Text>
                        </View>
                        <View style={styles.timerWrapper(theme)}>
                            <MaterialCommunityIcons name="timer-outline" color={theme.colors.white} size={20} />
                            <Text style={styles.timerText(theme)}>{getDuration(startTimestamp, stopTimestamp)}</Text>
                        </View>
                    </View>
                    <MapView
                        showsUserLocation={true}
                        initialRegion={{
                            ...currentUserPosition,
                            latitudeDelta: DEFAULT_ACTIVITY_MAP_DELTA,
                            longitudeDelta: DEFAULT_ACTIVITY_MAP_DELTA
                        }}
                        style={styles.map}
                    >
                        {locations.length > 1 && <MapView.Polyline coordinates={locations} strokeColor={theme.colors.primary} strokeWidth={5} />}
                    </MapView>
                    
                    {locations.length > 1 && (
                        <View style={styles.detailsWrapper}>
                            <FloatingBox
                                label="Distance"
                                icon="map-marker-distance"
                                backgroundColor={theme.colors.primary}
                                width={ (Dimensions.get('window').width - 20) / 2 - 5}
                                items={[{ label: 'Total', value: `${details.distance.toFixed(2)} km` }]}
                            />
                            <FloatingBox
                                label="Peaks"
                                icon="summit"
                                backgroundColor={theme.colors.success}
                                width={ (Dimensions.get('window').width - 20) / 2 - 5}
                                items={[{ label: 'Visited', value: `${details.visitedPeaks.length}` }]}
                            />
                            <FloatingBox
                                label="Altitude"
                                icon="trending-up"
                                items={[
                                    { label: 'Current', value: `${locations.at(-1).altitude.toFixed(2)} m` },
                                    { label: 'Max', value: `${details.highestPoint.toFixed(2)} m` },
                                    { label: 'Difference', value: `${details.altitudeDifference.toFixed(2)} m` },
                                    { label: 'Climbed up', value: `${details.climbUp.toFixed(2)} m` },
                                ]}
                            />
                            <FloatingBox
                                label="Speed"
                                icon="speedometer"
                                items={[
                                    { label: 'Current', value: `${details.currentSpeed.toFixed(2)} km/h` },
                                    { label: 'Average', value: `${details.averageSpeed.toFixed(2)} km/h` },
                                    { label: 'Max', value: `${details.maxSpeed.toFixed(2)} km/h` }
                                ]}
                            />
                            
                        </View>
                    )}
                    <View style={styles.buttonsWrapper}>
                        <Button mode="contained" onPress={handleRemoveActivity} style={styles.saveButton(theme)}>Save Activity</Button>
                        <Button onPress={handleRemoveActivity} style={styles.removeButton(theme)}>Remove Activity</Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    outerWrapper: theme => ({
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.white
    }),
    titleWrapper: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap'
    },
    timerWrapper: theme => ({
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
        paddingVertical: 10,
        paddingLeft: 8,
        paddingRight: 10,
        backgroundColor: theme.colors.success,
        borderRadius: 10

    }),
    timerText: theme => ({
        marginLeft: 5,
        fontSize: 16,
        color: theme.colors.white
    }),
    detailsWrapper: {
      
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    map:  {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width
    },
    buttonsWrapper: {
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    saveButton: theme => ({
        paddingVertical: 10,
        backgroundColor: theme.colors.success
    }),
    removeButton: theme => ({
        color: theme.colors.darkGray,
        marginTop: 10
    })
});



// import { useEffect } from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import { Text, Button, IconButton, useTheme } from 'react-native-paper';
// import { useDispatch } from 'react-redux';
// import MapView from 'react-native-maps';

// import { getUserLocationRequest, cancelActivity } from '../../../Store/actions';

// export default ({ currentActivity }) => {
//     const theme = useTheme();
//     const dispatch = useDispatch();

//     const handleRemoveActivity = () => dispatch(cancelActivity());

//     return (
//         <View style={styles.wrapper}>
//             <Button mode="contained"  onPress={handleRemoveActivity}>Remove ACtivity</Button>
//             <Button mode="outlined" outlineColor={theme.colors.primary} onPress={handleRemoveActivity}>Save ACtivity</Button>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     wrapper: {
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     separator: theme => ({
//         width: '100%',
//         height: 5,
//         backgroundColor: theme.colors.primary
//     }),
//     map:  {
//         width: Dimensions.get('window').width,
//         height: Dimensions.get('window').height - 350
//     },
//     description: theme => ({
//         margin: 20,
//         textAlign: 'center',
//         color: theme.colors.darkGray
//     }),
//     closeIconButton: theme => ({
//         position: 'absolute',
//         backgroundColor: theme.colors.white90,
//         borderWidth: 1,
//         borderColor: theme.colors.primary,
//         right: 5,
//         top: 35
//     }),
//     closeButton: theme => ({
//         borderColor: theme.colors.primary,
//     })
// });