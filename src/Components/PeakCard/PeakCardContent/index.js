import { IconButton, Button, Text, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import VisitedInfo from './VisitedInfo';
import WishlistInfo from './WishlistInfo';
import PeakImage from './PeakImage';
import PeakInfo from './PeakInfo';
import { useDispatch } from 'react-redux';
import { toggleWishlistItemRequest } from '../../../Store/actions';

export default ({ peak, isVisited, isOnWishlist, visitedDate, showInfoAboveImage = true, imageHeight = 250 }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleWishlistButtonPress = () => dispatch(toggleWishlistItemRequest(peak.id));
    const handleAddPeakPress = () => navigation.navigate('Add Peak', { peak });
    const handlePeakDetailsPress = () => navigation.navigate('Peak Details', { peak });

    return (
        <View style={styles.wrapper}>
            {isVisited && <VisitedInfo visitedDate={visitedDate} />}
            {isOnWishlist && <WishlistInfo />}
            <PeakImage imageUrl='https://picsum.photos/700' height={imageHeight} />
            <View style={showInfoAboveImage ? styles.absoluteInfoWrapper(theme) : {}}>
                <PeakInfo peak={peak} />
                <View style={styles.buttonsWrapper(showInfoAboveImage)}>
                    <IconButton
                        icon={isOnWishlist ? 'star-off' : 'star'}
                        mode="contained"
                        onPress={handleWishlistButtonPress}
                        size={30}
                        iconColor={theme.colors.wishlist}
                        style={styles.button(theme, 'wishlist')}
                    />
                    <IconButton
                        icon="plus"
                        mode="contained"
                        onPress={handleAddPeakPress}
                        size={30}
                        iconColor={theme.colors.white}
                        style={styles.button(theme, 'add-peak')}
                    />
                </View>
                {!showInfoAboveImage && <Button
                    icon="summit"
                    labelStyle={styles.detailsButton(theme)}
                    onPress={handlePeakDetailsPress}
                >
                    See peak Details
                </Button>}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        position: 'relative'
    },
    absoluteInfoWrapper: theme => ({
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.white80
    }),
    buttonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 10
    },
    buttonsWrapper: withRightOffset => ({
        position: 'absolute',
        top: 5,
        right: withRightOffset ? 10 : 0,
        display: 'flex',
        flexDirection: 'row',
        width: 110
    }),
    button: (theme, type) => ({
        display: 'inline-block',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: type === 'wishlist' ? theme.colors.wishlist : theme.colors.primary,
        backgroundColor:  type === 'wishlist' ? 'transparent': theme.colors.primary,
    }),
    detailsButton: theme => ({
        fontWeight: 'bold'
    })
})