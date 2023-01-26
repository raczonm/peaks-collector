import { useContext, useState, useEffect } from 'react';
import { Button, Text, useTheme } from 'react-native-paper';
import { Image, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import haversine from 'haversine';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MainPeakInfo from '../MainPeakInfo';
import AccountContext from '../../Context/AccountContext';

const MapActions = ({ peakId, isInWishlist }) => {
    const navigation = useNavigation();
    
    return <View style={{ marginTop: 10 }}>
        <Button compact={true} mode="flat">{isInWishlist ? 'Remove from wishlist' : 'Add to Wishlist'}</Button>
        <Button compact={true} mode="contained" onPress={() => navigation.navigate('Peak details', { peakId })}>Add to visited peaks</Button>
    </View>
};

export default ({ peak, isOnMap, isOnSearchView, onPress }) => {
    const { currentUserPosition } = useContext(AccountContext);
    const [distance, setDistance] = useState(0)
    const theme = useTheme();

    const getBorderColor = () => {
        if (peak.isVisited) return theme.colors.primary;
        if (peak.isInWishlist) return theme.colors.wishlist;

        return theme.colors.lightGray;
    };

    useEffect(() => {
        currentUserPosition && setDistance(haversine(currentUserPosition, peak.coordinate));
    }, [currentUserPosition]);

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.wrapper(theme, isOnMap, getBorderColor())}>
                {peak.isVisited && (
                    <View style={styles.visitedInfo(theme)}>
                         <MaterialCommunityIcons name="calendar" color={theme.colors.white} size={18} />
                        <Text variant="bodyMedium"  style={styles.visitedText(theme)}>{peak.conquerDate || peak.firstVisitedDate}</Text>
                    </View>
                )}
                <Image style={styles.image(!isOnMap && !isOnSearchView)} source={{ uri: 'https://picsum.photos/700' }} />
                <View style={styles.infoWrapper(isOnMap)}>
                    <MainPeakInfo peak={peak} isOnMap={isOnMap} />
                    {isOnMap && <Text style={styles.detailsText}>
                        <Text variant="bodyMedium"> {Math.round(distance, 2)}km away</Text>
                    </Text>}
                            
                    {!peak.isVisited && isOnMap && <MapActions isInWishlist={peak.isInWishlist} peakId={peak.id} />}
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
    image: isLarge => ({
        width: '100%',
        height: isLarge ? 200 : 120
    }),
    infoWrapper: isOnMap => ({
        padding: isOnMap ? 0 : 10,
        paddingTop: 10
    }),
    detailsText: {
        marginTop: 20
    },
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
    visitedText: theme => ({
        color: theme.colors.white,
        fontWeight: 'bold',
        marginLeft: 5
    })
})