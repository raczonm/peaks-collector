
import { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import FloatingBox from '../../../Components/FloatingBox';
import { DEFAULT_ACTIVITY_MAP_DELTA } from '../../../Config';
import { stopActivity } from '../../../Store/actions';
import CircleButton from '../../../Components/CircleButton';
import { getDuration } from '../../../Helpers'

export default ({ currentActivity, currentUserPosition }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const { startTimestamp, details, locations } = currentActivity;

    const handleStopActivity = () => dispatch(stopActivity());

    // "coords": Object {
    //     "accuracy": 16.286050492996214,
    //     "altitude": 305.6694526672363,
    //     "altitudeAccuracy": 10.915295600891113,
    //     "heading": -1,
    //     "latitude": 49.658972206296006,
    //     "longitude": 21.156828604318214,
    //     "speed": -1,
    //   },
    //   "timestamp": 1675354403565.5059,

    return (
        <View style={styles.outerWrapper(theme)}>
            <SafeAreaView style={styles.safeAreaWrapper}>
                <View style={styles.innerWrapper}>
                    <View style={styles.timerWrapper(theme)}>
                        <MaterialCommunityIcons name="timer-outline" color={theme.colors.white} size={30} style={{}} />
                        <Text style={styles.timerText(theme)}>{getDuration(startTimestamp)}</Text>
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
                    <View style={styles.stopWrapper(theme)}>
                        <Button mode="contained" onPress={handleStopActivity} style={styles.stopButton(theme)}>STOP</Button>
                    </View>
                </View>   
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    outerWrapper: theme => ({
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    }),
    innerWrapper: {
        position: 'relative',
        paddingTop: 40
    },
    detailsWrapper: {
        position: 'absolute',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: 95,
        paddingHorizontal: 10,
        width: Dimensions.get('window').width
    },
    timerWrapper: theme => ({
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
        paddingVertical: 10,
        paddingLeft: 20,
        paddingRight: 30,
        position: 'absolute',
        top: 10,
        width: 200,
        left: Dimensions.get('window').width / 2 - 100,
        zIndex: 2,
        backgroundColor: theme.colors.primary,
        borderRadius: 30

    }),
    timerText: theme => ({
        marginLeft: 10,
        fontSize: 24,
        color: theme.colors.white
    }),
    map:  {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 165
    },
    stopWrapper: theme => ({
        backgroundColor: theme.colors.white,
        padding: 10,
        paddingBottom: 20
    }),
    stopButton: theme => ({
        paddingVertical: 10,
        backgroundColor: theme.colors.error
    })
});