import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native';

import VisitedPeakCard from '../../../Components/VisitedPeakCard';
import PeakCardLoader from '../../../Components/PeakCard/PeakCardLoader';

export default () => {
    const { entrances } = useSelector(state => state.entrances);
    const { peaks } = useSelector(state => state.peaks);
    const [latestPeaks, setLatestPeaks] = useState()

    useEffect(() => {
        setLatestPeaks(entrances.map(entrance => ({
            ...peaks[entrance.peakId],
            entranceAssets: entrance.assets,
            entranceId: entrance.id,
            conquerDate: entrance.conquerDate 
        })));
    }, [peaks, entrances]);

    if (!entrances || !peaks) return null;

    return <FlatList
        renderItem={({ item }) => item.name ? <VisitedPeakCard peak={item} /> : <PeakCardLoader />}
        keyExtractor={item => item.entranceId}
        data={latestPeaks}
    />;
}
