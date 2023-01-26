import { useContext, useState, useEffect } from 'react';
import { Button, ActivityIndicator, useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import haversine from 'haversine';

import AccountContext from '../../../Context/AccountContext';
import PeaksContext from '../../../Context/PeaksContext';
import MainPeakInfo from '../../../Components/MainPeakInfo';
import Rating from '../../../Components/Rating';
import EntryImage from '../../../Components/Gallery/EntryImage';
import { BASE_ASSETS_URL } from '../../../Config';


export default ({ navigation, peak }) => {
    const theme = useTheme();
    const { currentUserPosition } = useContext(AccountContext);
    const [distance, setDistance] = useState(null)

    const handleAddPeak = () => navigation.navigate('Add Peak', { peak });

    useEffect(() => {
        currentUserPosition && setDistance(haversine(currentUserPosition, peak.coordinate));
    }, [currentUserPosition]);

    console.log('peakDetails', peak);

    return <View>
        <ScrollView style={styles.wrapper(theme)}>
            <EntryImage image={peak.assets.length ? `${BASE_ASSETS_URL}/${peak.assets[0]._id}.webp` : null} onPress={() => navigation.navigate('Peak Gallery')}/>
            <MainPeakInfo peak={peak} padding={10} />
            <Rating isEditable={false} />
            <View style={styles.peakInfoWrapper}>
                {distance && <Text>Distance: {distance}km</Text>}
                <Text>AAAAnd other peak details to be added basing on peak data</Text>
            </View>
        </ScrollView>
        <View style={styles.actionRow(theme)}>
            <Button style={styles.actionButton} mode="text">Add to Wishlist</Button>
            <Button style={styles.actionButton, { width: 200 }} mode="contained" onPress={handleAddPeak}>Add Peak</Button>
        </View>
    </View>
}

const styles = StyleSheet.create({
    wrapper: theme => ({
        width: '100%',
        height: Dimensions.get('window').height - 80,
        backgroundColor: theme.colors.white
    }),
    peakInfoWrapper: {
        padding: 10,
        paddingBottom: 110
    },
    mainImageWrapper: {
        position: 'relative',
        width: '100%',
        height: 250,
        marginBottom: 5
    },
    mainImage: {
        width: '100%', 
        height: 250
    },
    viewGalleryLabel: theme => ({
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        position: 'absolute',
        bottom: 20,
        right: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 5,

    }),
    actionButton: {
        marginHorizontal: 10
    },
    actionRow: theme => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 10,
        paddingBottom: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        position: 'absolute',
        bottom: 0
    })
});