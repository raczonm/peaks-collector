import { useContext, useState, useRef, useEffect } from 'react';
import MapView from 'react-native-maps';
import { View, Dimensions, StyleSheet } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

import MapButton from './MapButton';
import Filters from '../../Components/Filters';
import AccountContext from '../../Context/AccountContext';
import MapMarker from '../../Components/MapMarker';
import ModalSpinner from '../../Components/ModalSpinner';

import { DEFAULT_MAP_DELTA, MAX_MAP_DELTA_WITH_PEAKS } from '../../Config';
import PeaksContext from '../../Context/PeaksContext';
import { filterPeaks } from '../../Helpers';


let fetchPeaksTimeout;

export default ({ navigation }) => {
    const { getPeaksIds } = useContext(PeaksContext);
    const { currentUserPosition } = useContext(AccountContext);

    const theme = useTheme();
    const mapRef = useRef();

    const [peaksNearby, setPeaksNearby] = useState([]);
    const [showZoomInfo, setShowZoomInfo] = useState(false);
    const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false)
    const [activeFilters, setActiveFilters] = useState({});

    const handleRegionChange = position => {
        fetchPeaksTimeout && clearTimeout(fetchPeaksTimeout);

        if (position.latitudeDelta > MAX_MAP_DELTA_WITH_PEAKS) {
            setPeaksNearby([]);
            setShowZoomInfo(true);
        } else {
            setShowZoomInfo(false);
            fetchPeaksTimeout = setTimeout(() => {console.log('trigger'); fetchPeaks(position);}, 300);
        }
    };

    const handleFocusOnUserClick = () => mapRef.current.animateToRegion(currentUserPosition, 1000);

    const toggleFiltersModal = () => setIsFiltersModalVisible(!isFiltersModalVisible);

    const fetchPeaks = position => {
        getPeaksIds({
            params: {
                latitude: position.latitude,
                longitude: position.longitude,
                distance: (position.latitudeDelta + 0.01) / 2
            },
            fetchDataSuccessCallback: ({ peaks }) => {
                setPeaksNearby(peaks);
            }
        });
    };

    useEffect(() => console.log('list updated', peaksNearby.length), [peaksNearby]);

    return (
        <View style={{ flex: 1 }}>
            {currentUserPosition ?
                <>
                    <MapView
                        ref={mapRef}
                        showsUserLocation={true}
                        initialRegion={{
                            ...currentUserPosition,
                            latitudeDelta: DEFAULT_MAP_DELTA,
                            longitudeDelta: DEFAULT_MAP_DELTA
                        }}
                        onRegionChangeComplete={handleRegionChange}
                        style={{
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height - 170
                        }}
                    >
                        {filterPeaks(peaksNearby, activeFilters).map(peak => <MapMarker key={peak.id} peak={peak} />)}
                    </MapView>
                    <MapButton icon="crosshairs-gps" onPress={handleFocusOnUserClick} bottomPosition={showZoomInfo ? 125 : 85} />
                    <MapButton icon="tune" onPress={toggleFiltersModal} bottomPosition={showZoomInfo ? 75 : 35} isActive={!!Object.keys(activeFilters).length} />
                    {showZoomInfo && <Text style={styles.zoomInfo(theme)}>Zoom map to see peaks</Text>}
                </> :
                <ModalSpinner isVisible={!currentUserPosition} label="Checking location..." />
            }
            <Filters isVisible={isFiltersModalVisible} toggleModal={toggleFiltersModal} setActiveFilters={setActiveFilters} />
        </View>
    );
}

const styles = StyleSheet.create({
    zoomInfo: theme => ({
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    }),
    mapButton: theme => ({
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        borderColor: theme.colors.primary,
        right: 5,
        margin: 0
    }),
    focusOnUserButton: (showZoomInfo, theme) => ({ bottom: showZoomInfo ? 125 : 85 }),
    filtersButton: (showZoomInfo, theme) => ({ bottom: showZoomInfo ? 75 : 35 })
});