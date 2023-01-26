import { useRef } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

import MapMarker from '../../../Components/MapMarker';

export default ({ peaks }) => {
    const mapRef = useRef();

    const handleMapReady = () => mapRef.current.fitToSuppliedMarkers(
        peaks.map(peak => peak.id),
        { edgePadding: { top: 20, bottom: 20, left: 20, right: 20 }}
    );

    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={mapRef}
                onMapReady={handleMapReady}
                style={styles.map}
            >
                {peaks.map(peak => <MapMarker key={peak.id} peak={peak}/>)}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 220
    }
})