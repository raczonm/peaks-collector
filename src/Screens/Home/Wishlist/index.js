import { useContext, useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';

import AccountContext from '../../../Context/AccountContext';
import PeaksContext from '../../../Context/PeaksContext';
import WishlistPeakCard from '../../../Components/WishlistPeakCard';

export default ({ navigation }) => {
    const { wishlist } = useContext(AccountContext);
    const { peaks } = useContext(PeaksContext)
    const [latestPeaks, setLatestPeaks] = useState()

    const handleOnPress = peakId => navigation.navigate('Peak details', { peakId});

    useEffect(() => {
        setLatestPeaks(wishlist.map(peakId => {
            return { ...peaks[peakId] } || { id: userPeak.peakId };
        }));
    }, [peaks, wishlist]);

    if (!wishlist || !peaks) return null;

    return <FlatList
        renderItem={({ item }) => item.name ? <WishlistPeakCard onPress={() => handleOnPress(item.id)} peak={item} /> : <Text>Loading</Text>}
        keyExtractor={item => item.activityId}
        data={latestPeaks}
    />;
}
