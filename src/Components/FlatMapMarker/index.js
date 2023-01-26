import { Marker } from 'react-native-maps';

import defaultMarker from '../../Assets/marker.png';
import wishlistMarker from '../../Assets/marker.png';
import visitedMarker from '../../Assets/visitedMarker.png';

export default ({ peak }) => {
    const getMarker = () => {
        if (peak.isVisited) return visitedMarker;
        if (peak.isInVisited) return wishlistMarker;

        return defaultMarker;
    }

    return (
        <Marker
            identifier={peak.id.toString()}
            key={peak.id}
            coordinate={peak.coordinate}
            image={getMarker()}
        >
        </Marker>
    );
}