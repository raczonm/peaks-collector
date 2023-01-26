import { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import AccountContext from '../../../Context/AccountContext';
import PeaksContext from '../../../Context/PeaksContext';
import VisitedPeakCard from '../../../Components/VisitedPeakCard';
import PeakCardLoader from '../../../Components/PeakCardLoader';

export default () => {
    const { entrances } = useContext(AccountContext);
    const { peaks } = useContext(PeaksContext)
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
