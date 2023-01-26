import { Marker, Callout } from 'react-native-maps';

import PeakCard from '../PeakCard';
import defaultMarker from '../../Assets/marker.png';
import wishlistMarker from '../../Assets/marker.png';
import visitedMarker from '../../Assets/visitedMarker.png';

export default ({ peak, withCallout = true }) => {
    const getMarker = () => {
        if (peak.isVisited) return visitedMarker;
        if (peak.isInWishlist) return wishlistMarker;

        return defaultMarker;
    }

    return (
        <Marker
            identifier={peak.id}
            key={peak.id}
            coordinate={peak.coordinate}
            image={getMarker()}
        >
            {withCallout && <Callout>
                <PeakCard isOnMap={true} peak={peak} />
            </Callout>}
        </Marker>
    );
}