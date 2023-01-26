import { useContext, useState, useEffect } from 'react';
import { IconButton, Button, Text, useTheme } from 'react-native-paper';
import { Image, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountContext from '../../Context/AccountContext';
import PeaksContext from '../../Context/PeaksContext';

export default ({ peak, isOnMap, isOnSearchView, onPress }) => {
    const theme = useTheme();
    const navigation = useNavigation();
    const { togglePeakInWishlist } = useContext(AccountContext);
    const { updatePeakWishlist } = useContext(PeaksContext);

    const getBorderColor = () => {
        if (peak.isVisited) return theme.colors.primary;
        if (peak.isInWishlist) return theme.colors.wishlist;

        return theme.colors.lightGray;
    };

    const handleAddPeak = () => navigation.navigate('Add Peak', { peak });
    const handleWishlistButton = () => {
        togglePeakInWishlist({ 
            params: { peakId: peak.id },
            successCallback: () => updatePeakWishlist(peak.id, !peak.isInWishlist)
        });
    };

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.wrapper(theme, isOnMap, getBorderColor())}>
                {peak.isVisited && (
                    <View style={styles.visitedInfo(theme)}>
                        <MaterialCommunityIcons name="calendar" color={theme.colors.white} size={18} />
                        <Text variant="bodyMedium"  style={styles.visitedText(theme)}>{peak.conquerDate || peak.firstVisitedDate}</Text>
                    </View>
                )}
                {peak.isInWishlist && (
                    <View style={styles.wishlistInfo(getBorderColor())}>
                        <MaterialCommunityIcons name="star" color={theme.colors.white} size={18} />
                    </View>
                )}
                <Image style={styles.image(!isOnMap && !isOnSearchView)} source={{ uri: 'https://picsum.photos/700' }} />
                <View style={styles.infoWrapper(theme)}>
                    <Text variant="titleLarge">{peak.name} - {peak.elevation}m</Text>
                    {/* <Text variant="bodyMedium">{peak.country}, {peak.region}</Text> */}
                    <Text variant="bodyMedium">Poland, małopolska</Text>
                    <View style={styles.buttonsWrapper}>
                        <IconButton
                            icon="star"
                            mode="contained"
                            onPress={handleWishlistButton}
                            size={30}
                            iconColor={theme.colors.wishlist}
                            style={styles.button(theme, 'wishlist')}
                        />
                        <IconButton
                            icon="plus"
                            mode="contained"
                            onPress={handleAddPeak}
                            size={30}
                            iconColor={theme.colors.white}
                            style={styles.button(theme, 'add-peak')}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    wrapper: (theme, isOnMap, borderColor) => ({
        position: 'relative',
        borderWidth: isOnMap ? 0 : 2,
        borderColor,
        margin: isOnMap ? 0 : 5,
        marginBottom: 0,
        backgroundColor: theme.colors.white,
        minWidth: 250,
        maxWidth: isOnMap ? Dimensions.get('window').width - 40 : Dimensions.get('window').width
    }),
    image: () => ({
        width: '100%',
        height: 250
    }),
    visitedInfo: theme => ({
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        top: 0,
        left: 0,
        backgroundColor: theme.colors.primary,
        paddingVertical: 3,
        paddingRight: 10,
        paddingLeft: 5,
        zIndex: 2
    }),
    wishlistInfo: backgroundColor => ({
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor,
        padding: 5,
        paddingLeft: 7,
        zIndex: 2
    }),
    visitedText: theme => ({
        color: theme.colors.white,
        fontWeight: 'bold',
        marginLeft: 5,
    }),
    infoWrapper: theme => ({
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.white80,
        padding: 10,
        paddingRight: 110
    }),
    elevation: (theme) => ({
        position: 'absolute',
        textWrap: 'nowrap',
        top: 10,
        right: 10,
        color: theme.colors.black,
        textAlign: 'right'
    }),
    buttonsWrapper: {
        position: 'absolute',
        top: 5,
        right: 10,
        display: 'flex',
        flexDirection: 'row',
        width: 110
    },
    button: (theme, type) => ({
        display: 'inline-block',
        borderWidth: 2,
        borderColor: type === 'wishlist' ? theme.colors.wishlist : theme.colors.primary,
        backgroundColor:  type === 'wishlist' ? 'transparent': theme.colors.primary,
    })
})