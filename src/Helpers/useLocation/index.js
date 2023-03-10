import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
    const [currentUserLocation, setCurrentUserLocation] = useState(null);

    useEffect(() => {
        (async () => {
            const foregroundPermission = await Location.requestForegroundPermissionsAsync();
            
            if (foregroundPermission.status !== 'granted') return false;

            const { coords: { latitude, longitude }} = await Location.getCurrentPositionAsync({});

            setCurrentUserLocation({ latitude, longitude });

            const backgroundPermission = await Location.requestBackgroundPermissionsAsync();
            console.info(backgroundPermission.status)
            if (backgroundPermission.status !== 'granted') return false;
        })();
    }, []);

    return currentUserLocation;
}