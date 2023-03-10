import { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

import MapMarker from '../../../Components/Map/MapMarker';
import MapPeakCard from '../../../Components/Map/MapPeakCard';

export default  ({ peaks }) => {
    const searchMapRef = useRef();
    const [selectedPeakId, setSelectedPeakId] = useState(null);

    const centerOnResults = () => {
        searchMapRef.current.fitToSuppliedMarkers(
            peaks.map(peak => peak.id.toString()),
            { edgePadding: { top: 20, bottom: 20, left: 20, right: 20 }}
        );
    }

    const handleSelectPeak = peakId => {
        searchMapRef.current.animateToRegion(peaks.find(peak => peak.id === peakId).coordinate, 1000);
        setSelectedPeakId(peakId);
    };

    const getPeaks = () => peaks.reduce((acc, peak) => peak.coordinate ? [ ...acc, peak ] : acc, []);

    useEffect(() => { centerOnResults(); }, [peaks]);

    return <>
        <MapView ref={searchMapRef} showsUserLocation={true} style={styles.map}>
            {getPeaks().map(peak => (
                <MapMarker
                    key={peak.id}
                    peakId={peak.id}
                    coordinate={peak.coordinate}
                    onSelect={handleSelectPeak}
                    selectedPeakId={selectedPeakId}
                />
            ))}
        </MapView>
        {!!selectedPeakId && <MapPeakCard peak={peaks.find(peak => peak.id === selectedPeakId)} onClose={() => setSelectedPeakId(null)} />}
    </>;
};

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%'
    }
})