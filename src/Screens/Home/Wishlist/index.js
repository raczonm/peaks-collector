import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';

import PeakCard from '../../../Components/PeakCard';
import PeakCardLoader from '../../../Components/PeakCard/PeakCardLoader';
import { getPeaksByIdsRequest } from '../../../Store/actions';

export default ({ navigation }) => {
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist);
    const { peaks } = useSelector(state => state.peaks);

    useEffect(() => {
        dispatch(getPeaksByIdsRequest(wishlist.map(peakId => ({ peakId }))));
    }, [wishlist]);

    console.log(wishlist);

    if (!wishlist.length) return null;

    return (
        <FlatList
            renderItem={({ item }) => item.name ? <PeakCard peak={item} /> : <PeakCardLoader />}
            keyExtractor={item => item.id}
            data={wishlist.map(peakId => peaks[peakId])}
            contentContainerStyle={styles.wrapper}
        />
    );
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 5
    }
});