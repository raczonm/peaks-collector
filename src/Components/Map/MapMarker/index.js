import { useEffect, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Marker } from 'react-native-maps';

// import PeakCard from '../PeakCard';
import defaultMarker from '../../../Assets/marker.png';
import wishlistMarker from '../../../Assets/marker.png';
import visitedMarker from '../../../Assets/visitedMarker.png';

export default ({ peakId, onSelect, selectedPeakId, coordinate }) => {
    const [scale] = useState(new Animated.Value(1));
    const isSelected = peakId === selectedPeakId;

    const getMarker = () => {
        // GET VISITED WISHLIST / DATA
        // if (peak.isVisited) return visitedMarker;
        // if (peak.isInWishlist) return wishlistMarker; 
        // if (peakId === selectedPeakId) return visitedMarker;

        return defaultMarker;
    }

    useEffect(() => {
        Animated.timing(scale, { toValue: isSelected ? 1.7 : 1, duration: 100, useNativeDriver: true }).start()
    }, [isSelected]);

    return (
        <Marker
            identifier={peakId}
            key={peakId}
            coordinate={coordinate}
            onSelect={() => onSelect(peakId)}
        >
            <Animated.Image
                source={getMarker()}
                style={styles.markerImage(scale, !isSelected && !!selectedPeakId)} />
        </Marker>
    );
}

const styles = StyleSheet.create({
    markerImage: (scale, isOtherPeakSelected) => ({
        opacity: isOtherPeakSelected ? 0.5 : 1,
        width: 30,
        height: 30,
        transform: [{ scale }]
    })
})