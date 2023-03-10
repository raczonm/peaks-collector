import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapView from 'react-native-maps';
import { View, Dimensions, StyleSheet } from 'react-native';
import { useTheme, Text, ActivityIndicator } from 'react-native-paper';

import MapButton from '../../Components/Map/MapButton';
import MapMarker from '../../Components/Map/MapMarker';
import MapPeakCard from '../../Components/Map/MapPeakCard';
import ModalSpinner from '../../Components/ModalSpinner';

import Filters from '../../Components/Filters';

import { DEFAULT_MAP_DELTA, MAX_MAP_DELTA_WITH_PEAKS } from '../../Config';
import { filterPeaks } from '../../Helpers';

import { getPeaksIdsRequest, setActiveMapFilters } from '../../Store/actions';


let fetchPeaksTimeout;

export default () => {
    const [showZoomInfo, setShowZoomInfo] = useState(false);
    const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false);
    const [selectedPeakId, setSelectedPeakId] = useState(null);

    const theme = useTheme();
    const mapRef = useRef();

    const dispatch = useDispatch();

    const { isLoading, peaksNearbyIds, activeFilters } = useSelector(state => state.mainMap);
    const { peaks } = useSelector(state => state.peaks);
    const { currentUserPosition, isCurrentPositionLoaded } = useSelector(state => state.mapLocation);

    const setActiveFilters = filters => dispatch(setActiveMapFilters(filters));
    const toggleFiltersModal = () => setIsFiltersModalVisible(!isFiltersModalVisible);
    const handleFocusOnUserClick = () => mapRef.current.animateToRegion(currentUserPosition, 1000);

    const handleSelectPeak = peakId => {
        mapRef.current.animateToRegion(peaks[peakId].coordinate, 1000);
        setSelectedPeakId(peakId);
    };

    const handleRegionChange = position => {
        fetchPeaksTimeout && clearTimeout(fetchPeaksTimeout);

        if (position.latitudeDelta > MAX_MAP_DELTA_WITH_PEAKS) {
            setShowZoomInfo(true);
        } else {
            setShowZoomInfo(false);
            fetchPeaksTimeout = setTimeout(() => { fetchPeaks(position); }, 300);
        }
    };
    
    const fetchPeaks = position => {
        dispatch(getPeaksIdsRequest({
            action: 'getPeaksNearby',
            params: {
                latitude: position.latitude,
                longitude: position.longitude,
                distance: (position.latitudeDelta + 0.01) / 2
            }
        }));
    };

    const getPeaks = () => {
        const visiblePeaks = peaksNearbyIds.reduce((acc, peakId) => {
            return peaks[peakId] ? [...acc, peaks[peakId]] : acc;
        }, [])

        return filterPeaks(visiblePeaks, activeFilters);
    }

    if (!isCurrentPositionLoaded) return <ModalSpinner isVisible={true} label="Checking location..." />

    return (
        <View style={styles.wrapper}>
            <MapView
                ref={mapRef}
                showsUserLocation={true}
                initialRegion={{
                    ...currentUserPosition,
                    latitudeDelta: DEFAULT_MAP_DELTA,
                    longitudeDelta: DEFAULT_MAP_DELTA
                }}
                onRegionChangeComplete={handleRegionChange}
                style={styles.map}
            >
                {!showZoomInfo && getPeaks().map(peak => (
                    <MapMarker
                        key={peak.id}
                        peakId={peak.id}
                        coordinate={peak.coordinate}
                        onSelect={handleSelectPeak}
                        selectedPeakId={selectedPeakId}
                    />
                ))}
            </MapView>
            {isLoading && <ActivityIndicator size={20} animating={true} style={styles.loadingSpinner(theme)} />}
            <MapButton icon="crosshairs-gps" onPress={handleFocusOnUserClick} bottomPosition={showZoomInfo ? 125 : 85} />
            <MapButton icon="tune" onPress={toggleFiltersModal} bottomPosition={showZoomInfo ? 75 : 35} isActive={!!Object.keys(activeFilters).length} />
            {showZoomInfo && <Text style={styles.zoomInfo(theme)}>Zoom map to see peaks</Text>}
            <Filters isVisible={isFiltersModalVisible} toggleModal={toggleFiltersModal} setActiveFilters={setActiveFilters} />
            {!!selectedPeakId && <MapPeakCard peak={peaks[selectedPeakId]} onClose={() => setSelectedPeakId(null)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 170
    },
    loadingSpinner: theme => ({
        position: 'absolute',
        backgroundColor: theme.colors.white80,
        padding: 10,
        borderRadius: '50%',
        top: 5,
        right: 5,
        borderWidth: 1,
        borderColor: theme.colors.primary,
    }),
    zoomInfo: theme => ({
        backgroundColor: theme.colors.white80,
        padding: 20,
        position: 'absolute',
        bottom: 10,
        left: 5,
        right: 5,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary,
        color: theme.colors.primary,
        fontWeight: 'bold'
    })
});