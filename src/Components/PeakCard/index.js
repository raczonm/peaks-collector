import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import PeakCardContent from './PeakCardContent';

export default ({ peak }) => {
    const theme = useTheme();
    const wishlist = useSelector(state => state.wishlist);
    // const entrances = usSelector(state => state.entrances);

    return (
        <View style={styles.wrapper(theme)}>
            <PeakCardContent
                peak={peak}
                isOnWishlist={wishlist.includes(peak.id)}
                isVisited={false}
                imageHeight={250}
                showInfoAboveImage={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: theme => ({
        backgroundColor: theme.colors.white,
        marginBottom: 5
    })
})